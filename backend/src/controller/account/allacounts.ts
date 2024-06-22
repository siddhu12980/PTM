import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";


const prisma = new PrismaClient();

export const allaccounts = async (req: Request, res: Response) => {
    try {
        const account_details = await prisma.account.findMany(
            {
                include: {
                    user: {
                        select: {
                            username: true,
                            email: true,
                            first_name: true,
                            last_name: true
                        }
                    }

                }

            }
        );

        return res.status(200).json({
            account_details,
        });
    } catch (e: any) {
        res.json({
            msg: e.message,
        });
    }
};
