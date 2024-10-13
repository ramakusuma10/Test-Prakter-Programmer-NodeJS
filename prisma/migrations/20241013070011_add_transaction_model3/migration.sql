-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_serviceId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "serviceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;
