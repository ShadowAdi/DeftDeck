import mongoose, { Types } from "mongoose";

export const CardSchema = new mongoose.Schema(
  {
    cardType: {
      type: String,
      enum: ["LINK", "INFO", "CHECKLIST", "SNIPPET", "FILE"],
      required: true,
      default: "LINK",
    },

    cardTitle: {
      type: String,
      required: true,
    },

    cardDescription: {
      type: String,
    },

    // For LINK
    cardUrl: {
      type: String,
    },

    // For INFO
    cardText: {
      type: String,
    },

    // For CHECKLIST
    cardChecklist: [
      {
        task: { type: String },
        done: { type: Boolean, default: false },
      },
    ],

    // For SNIPPET
    cardCode: {
      language: { type: String },
      content: { type: String },
    },

    // For FILE
    cardFileUrl: {
      type: String,
    },

    cardColor: {
      type: String,
      default: "",
    },

    cardIcon: {
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
