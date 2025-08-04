import { axiosInstance } from "@/config/AxiosInstance";
import { CreateTeamFormData } from "@/schemas/teamSchema/teamSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const GetAllTeams = async ({
  token,
  router,
}: {
  token: string | null;
  router: ReturnType<typeof useRouter>;
}) => {
  if (!token) {
    toast.info(`Token is Not Provided`);
    router.push(`/login`);
  }
  try {
    const response = await axiosInstance.get("teams/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    if (data.success) {
      return { teams: data.teams, totalLength: data?.teams.length };
    } else {
      console.error(data.message);
      toast.error(data.message);
    }
  } catch (error) {
    console.error(`Failed to Get All Teams `, error);
    toast.error(`Failed to Get All Teams `);
  }
};

export const CreateTeam = async ({
  values,
  router,
  token,
}: {
  values: z.infer<typeof CreateTeamFormData>;
  router: ReturnType<typeof useRouter>;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post("teams/", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.data;
    if (data.success) {
      toast.success(data.messaged);
      values.teamDescription = "";
      values.teamImage = "";
      values.teamName = "";
      values.teamTags = [];
      router.push("/home");
    } else {
      console.error(`Error in creating team: ${data.message}`);
      toast.error(data.messaged);
    }
  } catch (error) {
    console.error(`Error in creating team: ${error}`);
    toast.error(`Failed to Create Team`);
  }
};
