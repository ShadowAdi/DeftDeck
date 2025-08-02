"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { AuthStore } from "@/store/AuthStore";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { isAuthenticated } = AuthStore();
  return (
    <header className="w-[96%] max-w-[1440px] mx-auto  flex justify-between items-center py-4 px-6 bg-white rounded-full shadow-md ">
      <Link
        href={"/"}
        className="text-xl xl:text-2xl font-bold text-[var(--primary)] tracking-tight"
      >
        DeftDeck
      </Link>

      {isAuthenticated ? (
        <Button
          onClick={() => {
            router.push("/home");
          }}
          className="bg-white text-[var(--primary)] px-6 py-2 rounded-full text-base font-medium border border-[var(--primary)]  transition-colors cursor-pointer "
        >
          Home
        </Button>
      ) : (
        <Button
          onClick={() => {
            router.push("/login");
          }}
          className="bg-[var(--primary)] text-white px-5 py-2 rounded-full text-base font-medium hover:bg-[var(--primary-hover)] transition-colors cursor-pointer"
        >
          SignIn
        </Button>
      )}
    </header>
  );
};

export default Header;
