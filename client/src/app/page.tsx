import Hero from "@/components/pages/home/Hero";
import React from "react";

const Home = () => {
  return (
    <main className="flex flex-col md:flex-row py-12 px-8 min-h-screen w-full items-center justify-center max-w-[1440px]">
      <Hero />
    </main>
  );
};

export default Home;
