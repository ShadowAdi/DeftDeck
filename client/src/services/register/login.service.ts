import { axiosInstance } from "@/config/AxiosInstance";
import { LoginFormData } from "@/schemas/authSchema/authSchema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import z from "zod";

export const handleLoginUser = async ({
  values,
  router,
  login,
}: {
  values: z.infer<typeof LoginFormData>;
  router: ReturnType<typeof useRouter>;
  login: (token: string) => void;
}) => {
  try {
    const response = await axiosInstance.post("user/login/", values);
    const data = await response.data;
    if (data.success) {
      if (data.token) {
        toast("User Has been login");
        login(data.token);
        router.push("/home");
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error(`Failed to login User`);
    }
  } catch (error) {
    console.error(`Error in login user `, error);
    toast.error(`Failed to login User`);
  }
};
