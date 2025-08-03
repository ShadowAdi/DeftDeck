export type TeamRole = "ADMIN" | "VIEWER" | "EDITOR";

export interface TeamMember {
  member: string;
  role: TeamRole;
}

export interface TeamType {
  _id: string;
  teamName: string;
  teamMembers: number;
  teamDescription: string;
  teamImage?: string | null;
  teamTags: string[];
  ownerId: string;
  members: TeamMember[];
  panels: string[];
  createdAt: string;
  updatedAt: string;
}
