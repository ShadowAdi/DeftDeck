import RegisterForm from "@/components/global/RegisterForm";
import React from "react";

const Register = () => {
  return (
    <section className="flex w-full h-full flex-col space-y-5 max-w-lg items-start my-auto justify-center">
      <h1 className="text-3xl text-stone-900 font-semibold ">Register User</h1>
      <RegisterForm />
    </section>
  );
};

export default Register;
