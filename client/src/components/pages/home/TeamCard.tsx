import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TeamType } from "@/types/TeamType";
import React from "react";
import Image from "next/image";

interface TeamCardProps {
  team: TeamType;
}

const TeamCard = ({ team }: TeamCardProps) => {
  const admin = team.members.find((member) => member.role === "ADMIN")?.member;
  return (
    <Card className="relative w-full cursor-pointer gap-1 bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mx-auto py-0 h-fit pb-5 space-y-3">
      {team.teamImage ? (
        <div className="relative h-36 w-full overflow-hidden">
          <Image
            src={team.teamImage}
            alt={team.teamName}
            layout="fill"
            objectFit="cover"
            className="w-full transition-transform duration-500 "
          />
          <div className="absolute bg-[var(--primary)] rounded-full top-2 right-3 text-sm gap-2 text-white size-6 flex items-center justify-center">
            {team.members?.length || 0}
          </div>
        </div>
      ) : (
        <div className="h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-base font-medium tracking-wide">
            No Image Available
          </span>
        </div>
      )}

      <CardHeader className="px-5 pb-0 pt-0 flex flex-row justify-between items-center gap-1">
        <h3 className="text-xl font-bold text-gray-900 truncate tracking-tight">
          {team.teamName}
        </h3>
        <div className="text-xs text-gray-500 mt-2 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Created: {new Date(team.createdAt).toLocaleDateString()}</span>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-0 pt-0 flex flex-row justify-between items-center gap-1">
        <div className="text-sm text-gray-700 flex flex-row gap-1">
          <strong className="font-semibold">Admin:</strong>
          <span className="text-gray-600">
            {admin ? admin.name : "No admin assigned"}
          </span>
        </div>
      </CardContent>

      {/* Decorative Hover Overlay */}
      <div className="absolute inset-0 pointer-events-none border-2 border-transparent hover:border-[var(--primary)]/20 rounded-3xl transition-colors duration-300" />
    </Card>
  );
};

export default TeamCard;
