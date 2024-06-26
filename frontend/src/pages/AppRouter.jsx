import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Daashboard } from "./Daashboard";
import { SendMoney } from "../components/SendMoney";
import { Splash } from "../components/Splash";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Daashboard />} />
      <Route path="/send" element={<SendMoney />} />
    </Routes>
  );
}
