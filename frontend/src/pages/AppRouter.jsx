import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Signup } from "./Signup";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/dashboard" element={<Signup />} /> */}
      {/* <Route path="/send" element={<Signup />} /> */}
    </Routes>
  );
}
