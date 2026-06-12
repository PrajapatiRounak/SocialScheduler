import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    engagement: { type: Number, default: 0 }, // percentage
  },
  { _id: false }
);

const platformResultSchema = new mongoose.Schema(
  {
    platform: { type: String, enum: ["instagram", "twitter", "linkedin"], required: true },
    status: {
      type: String,
      enum: ["pending", "published", "failed"],
      default: "pending",
    },
    publishedAt: Date,
    simulatedPostId: String,
    error: String,
  },
  { _id: false }
);

const postSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    mediaUrl: { type: String }, // path to uploaded file
    platforms: { type: [String], required: true }, // ["instagram","twitter"]
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["scheduled", "published", "failed"],
      default: "scheduled",
    },
    platformResults: [platformResultSchema],
    analytics: { type: analyticsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
