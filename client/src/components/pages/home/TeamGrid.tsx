import { TeamType } from "@/types/TeamType";
import React from "react";
import TeamPreviewCard from "./TeamPreviewCard";

interface Props {
  teams: TeamType[] | null;
}

const TeamGrid = ({ teams }: Props) => {
  return (
    <>
      {teams &&
        teams.length > 0 &&
        teams.map((team) => <TeamPreviewCard key={team._id} />)}
      <TeamPreviewCard />
    </>
  );
};

export default TeamGrid;
