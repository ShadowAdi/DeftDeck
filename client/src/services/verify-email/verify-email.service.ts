import { axiosInstance } from "@/config/AxiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const handleVerifyUser = async ({
  router,
  token,
}: {
  router: ReturnType<typeof useRouter>;
  token: string;
}) => {
  try {
    const response = await axiosInstance.get(
      `user/verify-email?token=${token}`
    );
    const data = await response.data;
    if (data.success) {
      toast.success(data.message);
      router.push("/login");
    } else {
      toast.error(`Failed to Verify User`);
    }
  } catch (error) {
    console.error(`Failed to Verify User`, error);
    toast.error(`Failed to Verify User`);
  }
};
