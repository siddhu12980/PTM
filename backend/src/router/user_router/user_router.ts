import { Router } from "express";
import { updatePassword, userSignin, userSignup } from "../../controller/user/user_auth";
import { authMiddleware } from "../../middelware/auth/auth";
import { userDetailList } from "../../controller/user/user_service";
export const userRouter = Router()

userRouter.post("/user/signin", userSignin)
userRouter.post("/user/signup", userSignup)
// userRouter.put("/user", authMiddleware, updatePassword)
// userRouter.get("/user", userDetailList)