import React, { ReactNode } from "react";

const AuthLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className="flex flex-col h-full w-full px-5 py-7 justify-center items-center ">
      {children}
    </main>
  );
};

export default AuthLayout;
