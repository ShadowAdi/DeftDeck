import mongoose from "mongoose";
import { PanelSchema } from "../schemas/PanelSchema.js";

export const PanelModel = mongoose.model("Panel", PanelSchema);
