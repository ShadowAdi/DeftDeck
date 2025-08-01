import mongoose from "mongoose";

const { Schema, Types } = mongoose;

export const TeamSchema = new Schema({
  teamName: {
    type: String,
    required: true,
    index:true
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
        index:true

  },
  ownerId: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
        index:true

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
          default: "VIEWER", 
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
