import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getbalance = async (req: Request, res: Response) => {

    try {

        const data = req.body.data.id;

        const balance = await prisma.account.findFirst({
            where: {
                user_id: data
            }
        }

        );


        res.status(200).json({
            account: balance
        })
    }
    catch (e: any) {
        res.json({
            msg: e.message
        })
    }




}