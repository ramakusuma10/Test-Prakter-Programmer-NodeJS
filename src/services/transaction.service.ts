import { PrismaClient, Prisma } from "@prisma/client";
import { topupValidator } from "../validator/validator";
import { TransactionType } from "@prisma/client";
import { User } from "../types/userType";
import { Service } from "../types/userType";

const prisma = new PrismaClient();

class transactionService {
  async topupBalance(userId: number, topUpAmount: number) {
    topupValidator.parse({ top_up_amount: topUpAmount });

    const user = await prisma.$queryRaw `
          SELECT balance FROM "User" WHERE id = ${userId}
        `;

    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

    const lastTransaction = await prisma.$queryRaw `
          SELECT COUNT(*) as total FROM "Transaction" WHERE transaction_type = 'TOPUP' OR transaction_type = 'PAYMENT'
        `;
    const transactionCount = Number(lastTransaction[0].total);
    const invoiceNumber = `INV-${formattedDate}-${(transactionCount + 1)
      .toString()
      .padStart(3, "0")}`;
    console.log(invoiceNumber);
    await prisma.$transaction([
      prisma.$queryRaw `
          UPDATE "User" SET balance = balance + ${topUpAmount} WHERE id = ${userId}
        `,

      prisma.$queryRaw `
          INSERT INTO "Transaction" (invoice_number, transaction_type, total_amount,"userId")
          VALUES (${invoiceNumber}, 'TOPUP', ${topUpAmount}, ${userId})
        `,
    ]);

    const updatedUser = await prisma.$queryRaw `
    SELECT balance FROM "User" WHERE id = ${userId}
   `;
    return updatedUser[0].balance;
  }

  async createTransaction(userId: number, serviceCode: string) {
    const service = await prisma.$queryRaw<
      Service[]
    >`SELECT * FROM "Service" WHERE service_code = ${serviceCode}`;

    if (!service.length) {
      throw new Error("Service atau Layanan tidak ditemukan");
    }

    const serviceData = service[0];

    // Cek saldo user
    const user = await prisma.$queryRaw<
      User[]
    >`SELECT * FROM "User" WHERE id = ${userId}`;

    if (!user.length || user[0].balance < serviceData.service_tarif) {
      throw new Error("Saldo tidak mencukupi");
    }

    const now = new Date();
    const formattedDate = `${now.getFullYear()}${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}`;

    const lastTransaction = await prisma.$queryRaw `
          SELECT COUNT(*) as total FROM "Transaction" WHERE transaction_type = 'TOPUP' OR transaction_type = 'PAYMENT'
        `;
    const transactionCount = Number(lastTransaction[0].total);
    const invoiceNumber = `INV-${formattedDate}-${(transactionCount + 1)
      .toString()
      .padStart(3, "0")}`;

    await prisma.$transaction(async (prisma) => {
      await prisma.$executeRaw `INSERT INTO "Transaction" (invoice_number, transaction_type, total_amount, "userId", "serviceId") VALUES (${invoiceNumber}, 'PAYMENT', ${serviceData.service_tarif}, ${userId}, ${serviceData.id})`;

      await prisma.$executeRaw `UPDATE "User" SET balance = balance - ${serviceData.service_tarif} WHERE id = ${userId}`;
    });

    return {
      invoice_number: invoiceNumber,
      service_code: serviceData.service_code,
      service_name: serviceData.service_name,
      transaction_type: TransactionType.PAYMENT,
      total_amount: serviceData.service_tarif,
      createdAt: new Date(),
    };
  }

  async getTransactionHistory(userId: number, limit?: number) {
    try {
      const query = `
      SELECT
        t.invoice_number,
        t.transaction_type,
        CASE
          WHEN t.transaction_type = 'TOPUP' THEN 'Top Up Balance'
          ELSE s.service_name
        END as description,
        t.total_amount,
        t."createdAt" as created_on
      FROM "Transaction" t
      LEFT JOIN "Service" s ON t."serviceId" = s.id
      WHERE t."userId" = ${userId}
      ORDER BY t."createdAt" DESC
      ${limit ? `LIMIT ${limit}` : ""}
    `;

      const transactions = await prisma.$queryRawUnsafe(query);
      return transactions;
    } catch(error) {
        console.error('Database error:', error);
        throw new Error("Something went wrong");
    }
  }
}

export default new transactionService();
