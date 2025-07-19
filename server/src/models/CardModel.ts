import mongoose from "mongoose";
import { CardSchema } from "../schemas/CardSchemas.js";

export const PanelCardModel = mongoose.model("PanelCard", CardSchema);
