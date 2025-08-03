"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AuthStore } from "@/store/AuthStore";

const Hero = () => {
  const router = useRouter();
  const { isAuthenticated } = AuthStore();
  return (
    <motion.div
      className="flex flex-col items-center space-y-6 w-full"
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center text-stone-900">
        DeftDeck — Your Work, Modular & Effortless
      </h1>
      <p className="text-base md:text-lg text-center text-stone-900">
        Create, organize, and collaborate on tasks, designs, code, and files in
        one unified deck.
      </p>

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
            router.push("/register");
          }}
          className="px-6 py-3 transition-all duration-500 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-lg font-semibold"
        >
          Get Started
        </Button>
      )}
    </motion.div>
  );
};

export default Hero;
