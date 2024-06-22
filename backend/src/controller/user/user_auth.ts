import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import createToken from "../../util/create_jwt";

const prisma = new PrismaClient();

export const userSignup = async (req: Request, res: Response) => {
    try {
        const { email, username, password, first_name, last_name } = req.body;
        console.log(req.body)

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(411).json({ message: "The User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                first_name,
                last_name,
                email,
                username: username,
                password: hashedPassword,
            },
        });
        const user_id = newUser.id

        const account = await prisma.account.create({
            data: {
                user_id,
                balance: 1 + Math.random() * 10000
            }
        })
        console.log(account)


        return res
            .status(200)
            .json({ msg: "User  created successfully", user: newUser });
    } catch (e) {
        return res.status(400).json({ msg: "USer Signup Error" });
    }
};

export const userSignin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return res.status(400).json({ msg: "No Such User Exists" });
        }

        const reverseHash = await bcrypt.compare(password, existingUser.password);
        if (!reverseHash) {
            return res.status(411).json({ msg: "Wrong Password" });
        }

        const token = createToken({ email: email, id: existingUser.id });
        console.log(token);

        return res
            .status(200)
            .json({ msg: "User Loggedin successfully", token: token });
    } catch (e) {
        return res.status(400).json({ msg: "USer Signin Error" });
    }
};

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { email, password, new_password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!existingUser) {
            return res.status(400).json({ msg: "No Such User Exists" });
        }

        const reverseHash = await bcrypt.compare(password, existingUser.password);
        if (!reverseHash) {
            return res.status(411).json({ msg: "Wrong Password" });
        }

        const hashedPassword = await bcrypt.hash(new_password, 10);

        const new_user_data = await prisma.user.update({
            where: {
                email,
            },
            data: {
                password: hashedPassword,
            },
        });

        return res
            .status(200)
            .json({ msg: "Password changed successfully", user: new_user_data });
    } catch (e) {
        return res.status(400).json({ msg: " Error" });
    }
};
