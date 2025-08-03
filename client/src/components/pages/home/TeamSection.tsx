"use client";
import React from "react";
import TeamPreviewCard from "./TeamPreviewCard";

const TeamSection = () => {
  return (
    <section className="w-full flex-1 grid grid-cols-1 space-x-4 space-y-5   sm:grid-cols-2  md:grid-cols-3 ">
      <TeamPreviewCard />
    </section>
  );
};

export default TeamSection;
