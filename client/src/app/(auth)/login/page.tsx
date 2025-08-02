import LoginForm from "@/components/global/LoginForm";
import React from "react";

const Login = () => {
  return (
    <section className="flex w-full h-full flex-col space-y-5 max-w-lg items-start my-auto justify-center">
      <h1 className="text-3xl text-stone-900 font-semibold ">Login User</h1>
      <LoginForm />
    </section>
  );
};

export default Login;
