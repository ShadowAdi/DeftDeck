import { axiosInstance } from "@/config/AxiosInstance";
import { logger } from "@/config/loggerConfig";
import { LoginFormData } from "@/schemas/authSchema/authSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const handleLoginUser = async ({
  values,
  router,
}: {
  values: z.infer<typeof LoginFormData>;
  router: ReturnType<typeof useRouter>;
}) => {
  try {
      const response = await axiosInstance.post("login/", values);
      const data = await response.data;
      if (data.success) {
        logger.info(`User With email: ${values.email} login successfully`);
        toast("User Has been login");
        router.push("/home");
      } else {
        logger.error(data.error);
        toast.error(`Failed to login User`);
      }
    } catch (error) {
      console.error(`Error in login user `, error);
      logger.error(`Error in login user `, error);
      toast.error(`Failed to login User`);
    }
};
