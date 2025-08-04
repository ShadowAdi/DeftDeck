import z from "zod";

export const CreateTeamFormData = z.object({
  teamName: z.string().min(2).max(50),
  teamDescription: z.string().optional(),
  teamImage: z.string().optional(),
  teamTags: z.array(z.string()), 
})
