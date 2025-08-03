import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TeamType } from "@/types/TeamType";
import React from "react";

interface TeamCardProps {
  team: TeamType;
}

const TeamCard = ({ team }: TeamCardProps) => {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <h3 className="text-xl font-semibold text-black">{team.teamName}</h3>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <div className="text-sm text-gray-600">
          <strong>Members:</strong> {team.teamMembers}
        </div>

        {team.teamTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {team.teamTags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-500 mt-2">
          Created: {new Date(team.createdAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
