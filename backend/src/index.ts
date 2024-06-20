import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { userRouter } from "./router/user_router/user_router";
import { accountRouter } from "./router/account_router/account_router";

const app = express();
const PORT = 3200;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", accountRouter)


app.listen(PORT, () => console.log(`Connected at ${PORT}`));


