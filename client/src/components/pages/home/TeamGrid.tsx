import { TeamType } from "@/types/TeamType";
import React from "react";
import TeamPreviewCard from "./TeamPreviewCard";
import TeamCard from "./TeamCard";

interface Props {
  teams: TeamType[] | null;
}

const TeamGrid = ({ teams }: Props) => {
  return (
    <>
      {teams &&
        teams.length > 0 &&
        teams.map((team) => <TeamCard team={team} key={team._id} />)}
      <TeamPreviewCard />
    </>
  );
};

export default TeamGrid;
