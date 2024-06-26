import { PrismaClient, TransactionStatus } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

function transfer(from: string, to: string, amount: number) {
    return prisma.$transaction(async (tx) => {

        const sender = await tx.account.update({
            data: {
                balance: {
                    decrement: amount,
                },
            },
            where: {
                id: from,
            },
        })

        if (sender.balance < 0) {
            throw new Error(`You doesn't have enough to send ${amount}`)
        }

        const recipient = await tx.account.update({
            data: {
                balance: {
                    increment: amount,
                },
            },
            where: {
                id: to,
            },
        })

        const transaction1 = await tx.transaction.create({
            data: {
                amount,
                senderId: sender.id,
                receiverId: recipient.id,
                status: TransactionStatus.COMPLETED,
            },

        })


        // Add transaction to sender's sentTransactions
        await tx.account.update({
            where: {
                id: from,
            },
            data: {
                sentTransactions: {
                    connect: {
                        id: transaction1.id,
                    },
                },
            },
        });

        // Add transaction to recipient's receivedTransactions
        await tx.account.update({
            where: {
                id: to,
            },
            data: {
                receivedTransactions: {
                    connect: {
                        id: transaction1.id,
                    },
                },
            },
        });

        return { sender, recipient, transaction1 };
    });
}








export const transferBalance = async (req: Request, res: Response) => {
    console.log("token_id:", req.body.data.id)

    try {


        const { transferAmount, toAccount } = req.body;
        if (!transferAmount || !toAccount) {
            return res.status(400).json({
                msg: "Invalid Request",
            });
        }

        if (toAccount == req.body.data.id) {
            return res.status(400).json({
                msg: "You can't transfer to your own account",
            });

        }
        const my_account = await prisma.account.findFirst({
            where: {
                user_id: parseInt(req.body.data.id),
            },
        });
        if (!my_account) {
            return res.status(400).json({
                msg: "Your Account not found",
            });
        }

        if (my_account.balance < parseInt(transferAmount)) {
            return res.status(400).json({
                msg: "You doesn't have enough balance",
            });
        }
        const destinationAccount = await prisma.account.findFirst({
            where: {
                user_id: parseInt(toAccount),
            }
        })

        if (!destinationAccount) {
            return res.status(400).json({
                msg: "Destination Account not found",
            });
        }
        console.log("my_account:", my_account)
        console.log("destinationAccount:", destinationAccount)

        const transaction_data = await transfer(my_account.id, destinationAccount.id, parseInt(transferAmount))


        res.status(200).json({
            data: transaction_data
        });
    } catch (e: any) {
        res.status(400).json({
            msg: e.message,
        });
    }
};
