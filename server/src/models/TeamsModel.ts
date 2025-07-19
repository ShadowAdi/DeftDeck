import mongoose from "mongoose";
import { TeamSchema } from "../schemas/TeamSchema.js";

export const TeamModel = mongoose.model("Team", TeamSchema);
