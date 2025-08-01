import mongoose, { Types } from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileUrl: {
      type: String,
      default:
        "https://i.pinimg.com/736x/97/38/bd/9738bdd2658af637387dd5144e3ac528.jpg",
    },
    companyName: {
      type: String,
      required: true,
      index: true,
    },
    teams: {
      type: [Types.ObjectId],
      ref: "Team",
      default: [],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      index: true,
      unique: true,
    },
    emailVerificationSentAt: {
      type: Date,
    },
    emailVerifiedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);
