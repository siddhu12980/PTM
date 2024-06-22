import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getbalance = async (req: Request, res: Response) => {

    try {
        const data = req.body.data.id;
        const user = await prisma.user.findUnique({
            where: {
                id: data
            }

        })

        const balance = await prisma.account.findFirst({
            where: {
                user_id: data
            }
        }
        );


        res.status(200).json({
            account: balance,
            user: user?.username

        })
    }
    catch (e: any) {
        res.json({
            msg: e.message
        })
    }




}