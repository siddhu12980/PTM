import { useState } from "react";
import FormAction from "../components/FormAction";
import FormExtra from "../components/FormExtra";
import Input from "../components/Input";
import { loginFields } from "../constants/formfield";
import { Header } from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "../constants/Toast";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export const Login = () => {
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    console.log("LoginState", loginState);

    fetch("http://localhost:3200/api/v1/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginState.emailaddress,
        password: loginState.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.token !== undefined) {
          setToast({
            show: true,
            message: "Login successful!",
            type: "success",
          });

          const { token } = data;
          localStorage.setItem("token", token);

          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setToast({
          show: true,
          message: "Login Failed!",
          type: "error",
        });
      });
  };
  const closeToast = () => {
    setToast({ show: false, message: "", type: "" });
  };

  return (
    <>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <Header
              heading={"Sign In"}
              paragraph={"Enter Your Credentialas to access your account."}
            />
            <div className="-space-y-px">
              {fields.map((field) => (
                <Input
                  key={field.id}
                  handleChange={handleChange}
                  value={loginState[field.id]}
                  labelText={field.labelText}
                  labelFor={field.labelFor}
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  isRequired={field.isRequired}
                  placeholder={field.placeholder}
                />
              ))}
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
            <div className=" text-center">
              <p className="text-xm">
                Dont Have a account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold  text-slate-800 hover:text-slate-500"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={closeToast}
          />
        )}
      </div>
    </>
  );
};
