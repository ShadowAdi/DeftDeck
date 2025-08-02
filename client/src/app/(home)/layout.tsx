import React, { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col md:flex-row py-4 px-8 flex-1 w-full  items-center justify-center max-w-[1440px]">
      {children}
    </main>
  );
};

export default HomeLayout;
