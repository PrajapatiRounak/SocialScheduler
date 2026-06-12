import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    // Simulated connected accounts. In real mode these would hold OAuth tokens.
    connectedAccounts: [
      {
        platform: { type: String, enum: ["instagram", "twitter", "linkedin"] },
        username: String,
        connectedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
