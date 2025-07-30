export interface CreateTeamDataInterface {
    teamName: string;
    teamDescription: string|null;
    teamImage: string|null;
    teamTags: [string]|[]|null;
  }

export interface UpdateTeamDataInterface {
    teamName: string|null;
    teamDescription: string|null;
    teamImage: string|null;
    teamTags: [string]|[]|null;
  }