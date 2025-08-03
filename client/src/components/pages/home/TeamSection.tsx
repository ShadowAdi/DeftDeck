"use client";

import React, { useEffect, useState } from "react";
import TeamPreviewCard from "./TeamPreviewCard";
import { AuthStore } from "@/store/AuthStore";
import { GetAllTeams } from "@/services/teams/team.service";
import { useRouter } from "next/navigation";
import { TeamType } from "@/types/TeamType";
import { toast } from "sonner";
import TeamCardLoader from "./TeamCardLoader";
import TeamGrid from "./TeamGrid";

const TeamSection = () => {
  const { isAuthenticated, token } = AuthStore();
  const router = useRouter();
  const [teams, setTeams] = useState<TeamType[] | null>(null);
  const [loading, setLoading] = useState(true);

  const GetTeams = async () => {
    try {
      const result = await GetAllTeams({ token, router });
      if (result) {
        setTeams(result.teams);
      }
    } catch (error) {
      toast.error(`Failed to get the teams`);
      console.error(`Failed to get the teams`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    GetTeams();
  }, [isAuthenticated, token]);

  return (
    <section className="w-full flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {loading ? <TeamCardLoader /> : <TeamGrid teams={teams} />}
    </section>
  );
};

export default TeamSection;
