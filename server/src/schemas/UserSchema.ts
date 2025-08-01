import mongoose, { Types } from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
