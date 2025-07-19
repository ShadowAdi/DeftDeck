import mongoose from "mongoose";

const { Schema, Types } = mongoose;

export const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  teamMembers: {
    type: Number,
    default: 1,
  },
  teamDescription: {
    type: String,
    default: "",
  },
  teamImage: {
    type: String,
  },
  teamTags: {
    type: [String],
    default: [],
  },
  ownerId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: {
    type: [
      {
        member: {
          type: Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["ADMIN", "VIEWER", "EDITOR"],
          default: "VIEWER", // ✅ fix: not an array
        },
      },
    ],
    default: [],
  },
  panels: {
    type: [Types.ObjectId],
    ref: "Panel",
    default: [],
  },
},{
    timestamps:true
});
