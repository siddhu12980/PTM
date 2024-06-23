import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Daashboard } from "./Daashboard";
import { SendMoney } from "../components/SendMoney";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Daashboard />} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
  );
}
