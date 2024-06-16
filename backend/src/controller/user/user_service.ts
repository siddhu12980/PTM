import { PrismaClient, user } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const userDetailList = async (req: Request, res: Response) => {
    try {
        const filt = req.query.filter?.toString();

        if (filt == undefined) {
            return res.status(400).json({
                msg: "User Details Error",
            });
        }
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        first_name: {
                            startsWith: filt,
                        },
                    },
                    {
                        last_name: {
                            startsWith: filt,
                        },
                    },
                ],
            },


        });


        return res.json({
            data: users,
        });

    } catch (e: any) {
        return res.status(400).json({
            msg: e.message
        });
    }
};
