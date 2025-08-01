import { axiosInstance } from "@/config/AxiosInstance";
import { logger } from "@/config/loggerConfig";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "@/schemas/authSchema/authSchema";
import z from "zod";

export const handleRegisterUser = async ({
  values,
  router,
}: {
  values: z.infer<typeof RegisterFormData>;
  router: ReturnType<typeof useRouter>;
}) => {
  try {
    const response = await axiosInstance.post("/", values);
    const data = response.data;

    if (data.success) {
      logger.info(`User with email: ${values.email} registered successfully`);
      toast.success("User has been registered");
      router.push("/login");
    } else {
      logger.error(data.error);
      toast.error("Failed to create user");
    }
  } catch (error) {
    console.error("Error in registering user", error);
    logger.error("Error in registering user", error);
    toast.error("Failed to create user");
  }
};
