import { axiosInstance } from "@/config/AxiosInstance";
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
    const response = await axiosInstance.post("user/", values);
    const data = response.data;

    if (data.success) {
      toast.success("User has been registered");
      router.push("/login");
    } else {
      toast.error("Failed to create user");
    }
  } catch (error) {
    console.error("Error in registering user", error);
    toast.error("Failed to create user");
  }
};
