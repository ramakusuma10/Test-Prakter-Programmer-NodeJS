import { Request } from "express";
import { z } from "zod";
import transactionService from "../services/transaction.service";

class transactionController {
  async transaksiTopup(req: Request, res: any) {
    try {
      const userId = res.locals.user.id;
      const { top_up_amount } = req.body;
      const updatedBalance = await transactionService.topupBalance(
        userId,
        top_up_amount
      );

      return res.status(200).json({
        status: 0,
        message: "Topup Balance Berhasil",
        data: {
          balance: updatedBalance,
        },
      });
    } catch (error) {
      if (error instanceof Error && error.message === "User tidak ditemukan") {
        return res.status(404).json({
          status: 404,
          message: error.message,
          data: null,
        });
      } else if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 102,
          message: error.errors[0].message,
          data: null,
        });
      }

      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  async transactionPayment(req: Request, res: any) {
    try {
      const userId = res.locals.user.id;
      const { service_code } = req.body;
 
      const transactionData = await transactionService.createTransaction(userId, service_code);

      return res.status(200).json({
        status: 0,
        message: "Transaksi Berhasil",
        data: transactionData,
      });
    } catch (error) {
      if (error.message === "Service atau Layanan tidak ditemukan") {
        return res.status(400).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      if (error.message === "Saldo tidak mencukupi") {
        return res.status(400).json({
          status: 102,
          message: error.message,
          data: null,
        });
      }

      console.error("Error creating transaction:", error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  }

  async handleGetTransactionHistory (req: Request, res: any) {
    try {
      const userId = res.locals.user.id;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      const transactions = await transactionService.getTransactionHistory(userId, limit);
  
      return res.status(200).json({
        status: 0,
        message: "Get History Berhasil",
        data: {
          offset: "0", 
          limit: limit || 'All', 
          records: transactions,
        },
      });
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        data: null,
      });
    }
  };
}

export default new transactionController();
