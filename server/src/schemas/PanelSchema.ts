import mongoose, { Types } from "mongoose";

export const PanelSchema = new mongoose.Schema(
  {
    panelName: {
      type: String,
      required: true,
    },
    teamId: {
      type: Types.ObjectId,
      ref: "Team",
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    panelDescription: {
      type: String,
      required: true,
    },
    panelIcon: {
      type: String,
    },
    panelCoverPic: {
      type: String,
    },
    panelTags: {
      type: [String],
      default: [],
    },
    panelColor: {
      type: String,
    },
    cards: {
      type: [Types.ObjectId],
      ref: "Card",
      default: [],
    },
    isEditable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
