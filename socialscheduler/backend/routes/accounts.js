import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// List connected accounts
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.connectedAccounts);
});

// Connect (simulated) an account
router.post("/connect", protect, async (req, res) => {
  const { platform, username } = req.body;
  if (!["instagram", "twitter", "linkedin"].includes(platform))
    return res.status(400).json({ message: "Invalid platform" });

  const user = await User.findById(req.userId);
  if (user.connectedAccounts.some((a) => a.platform === platform))
    return res.status(400).json({ message: "Already connected" });

  user.connectedAccounts.push({ platform, username: username || `@${platform}_user` });
  await user.save();
  res.json(user.connectedAccounts);
});

// Disconnect
router.delete("/:platform", protect, async (req, res) => {
  const user = await User.findById(req.userId);
  user.connectedAccounts = user.connectedAccounts.filter(
    (a) => a.platform !== req.params.platform
  );
  await user.save();
  res.json(user.connectedAccounts);
});

export default router;
