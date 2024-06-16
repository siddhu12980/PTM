import { PrismaClient } from "@prisma/client";
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

        return [sender, recipient]
    })
}


export const transferBalance = async (req: Request, res: Response) => {
    try {

        const { transferAmount, toAccount } = req.body;
        const my_account = await prisma.account.findFirst({
            where: {
                user_id: req.body.data.id,
            },
        });
        if (!my_account) {
            return res.status(400).json({
                msg: "Your Account not found",
            });
        }
        const destinationAccount = await prisma.account.findFirst({
            where: {
                user_id: toAccount
            }
        })

        if (!destinationAccount) {
            return res.status(400).json({
                msg: "Destination Account not found",
            });
        }

        const transaction_data = await transfer(my_account.id, destinationAccount.id, transferAmount)


        res.status(200).json({
            data: transaction_data
        });
    } catch (e: any) {
        res.status(400).json({
            msg: e.message,
        });
    }
};
