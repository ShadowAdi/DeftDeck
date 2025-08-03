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
      toast.success("Please Check Your Mail");
      values.companyName = "";
      values.password = "";
      values.email = "";
      values.name = "";
      router.push("/verify-email")
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Error in registering user", error);
    toast.error("Failed to create user");
  }
};
