import mongoose, { Types } from "mongoose";

export const CardSchema = new mongoose.Schema(
  {
    cardUrl: {
      type: String,
      required: true,
    },
    cardColor: {
      type: String,
      default: "",
    },
    cardIcon: {
      type: String,
    },
    cardTitle: {
      type: String,
      required: true,
    },
    cardDescription: {
      type: String,
    },
    cardImage: {
      type: String,
    },
    cardTags: {
      type: [String],
      default: [],
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardPanel: {
      type: Types.ObjectId,
      ref: "Panel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
