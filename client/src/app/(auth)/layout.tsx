import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col md:flex-row py-12 px-8 flex-1 w-full bg-[var(--backgroundColor)]  items-center justify-center max-w-[1440px]">
      {" "}
      {children}
    </main>
  );
};

export default AuthLayout;
