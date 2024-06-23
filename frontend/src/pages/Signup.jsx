import React, { useState } from "react";
import { signupFields } from "../constants/formfield";
import FormAction from "../components/FormAction";
import FormExtra from "../components/FormExtra";
import Input from "../components/Input";
import { Header } from "../components/Header";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export const Signup = () => {
  const navigate = useNavigate();
  const [SignupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) => {
    setSignupState({ ...SignupState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (SignupState.password !== SignupState.confirmpassword) {
      alert("Password and Confirm Password should be same");
      return;
    }
    authenticateUser();
  };

  const authenticateUser = () => {
    console.log("SignupState", SignupState);

    fetch("http://localhost:3200/api/v1/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: SignupState.emailaddress,
        username: SignupState.username,
        password: SignupState.password,
        first_name: SignupState.first_name,
        last_name: SignupState.last_name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.user !== undefined) {
          alert("User Created Successfully");
          setSignupState(fieldsState);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("User Creation Failed");
      });
  };

  return (
    <>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Header
          heading={"Sign Up"}
          paragraph={"Enter Your Credentialas to Create your account."}
        />
        <div className="-space-y-px">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={SignupState[field.id]}
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
        <FormAction handleSubmit={handleSubmit} text="Sign Up" />
        <div className=" text-center">
          <p className="text-xm">
            Already Have a account?{" "}
            <Link
              to="/login"
              className="font-semibold  text-slate-800 hover:text-slate-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};
