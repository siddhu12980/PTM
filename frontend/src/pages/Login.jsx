import { useState } from "react";
import FormAction from "../components/FormAction";
import FormExtra from "../components/FormExtra";
import Input from "../components/Input";
import { loginFields } from "../constants/formfield";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {};

  return (
    <>
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
    </>
  );
};
