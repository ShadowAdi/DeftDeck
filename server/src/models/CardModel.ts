import mongoose from "mongoose";
import { CardSchema } from "../schemas/CardSchemas.js";

export const CardModel = mongoose.model("Card", CardSchema);
