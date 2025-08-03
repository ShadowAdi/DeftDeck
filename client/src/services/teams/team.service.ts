import { axiosInstance } from "@/config/AxiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const GetAllTeams = async ({
  token,
  router,
}: {
  token: string|null;
  router: ReturnType<typeof useRouter>;
})=> {
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
