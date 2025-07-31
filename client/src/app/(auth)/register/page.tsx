import RegisterForm from "@/components/global/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <section className="flex w-full h-full flex-col">
      <h1 className="text-3xl text-black font-semibold ">Register User</h1>
      <RegisterForm/>
    </section>
  );
};

export default Register;
