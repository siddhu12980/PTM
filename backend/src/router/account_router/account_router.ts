import { Router } from "express";
import { authMiddleware } from "../../middelware/auth/auth";
import { getbalance } from "../../controller/account/balance";
import { transferBalance } from "../../controller/account/transfer";
export const accountRouter = Router()

accountRouter.get("/account/balance", authMiddleware, getbalance)
accountRouter.post("/account/transfer", authMiddleware, transferBalance)