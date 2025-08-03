import TeamSection from "@/components/pages/home/TeamSection";
import React from "react";

const page = () => {
  return (
    <section className="flex w-full py-6 h-full flex-1 flex-col space-y-5 items-start  justify-start ">
      <div className="flex flex-col w-full border-b border-b-[#5e5c5c60] pb-2">
        <h1 className="text-3xl text-stone-900 font-semibold ">Teams</h1>
      </div>
      <TeamSection/>

    </section>
  );
};

export default page;
