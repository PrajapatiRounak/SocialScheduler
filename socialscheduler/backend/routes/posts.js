import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// --- Media upload setup ---
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_")),
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Create post (with optional media)
router.post("/", protect, upload.single("media"), async (req, res) => {
  try {
    let { content, platforms, scheduledAt } = req.body;
    if (typeof platforms === "string") platforms = JSON.parse(platforms);

    if (!content || !platforms?.length || !scheduledAt)
      return res.status(400).json({ message: "content, platforms, scheduledAt required" });

    const post = await Post.create({
      user: req.userId,
      content,
      platforms,
      scheduledAt: new Date(scheduledAt),
      mediaUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      platformResults: platforms.map((p) => ({ platform: p, status: "pending" })),
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all posts for user (optional ?status=scheduled)
router.get("/", protect, async (req, res) => {
  const filter = { user: req.userId };
  if (req.query.status) filter.status = req.query.status;
  const posts = await Post.find(filter).sort({ scheduledAt: 1 });
  res.json(posts);
});

// Get single
router.get("/:id", protect, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, user: req.userId });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json(post);
});

// Update (only if still scheduled)
router.put("/:id", protect, upload.single("media"), async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id, user: req.userId });
    if (!post) return res.status(404).json({ message: "Not found" });
    if (post.status !== "scheduled")
      return res.status(400).json({ message: "Cannot edit a published post" });

    let { content, platforms, scheduledAt } = req.body;
    if (typeof platforms === "string") platforms = JSON.parse(platforms);

    if (content) post.content = content;
    if (platforms?.length) {
      post.platforms = platforms;
      post.platformResults = platforms.map((p) => ({ platform: p, status: "pending" }));
    }
    if (scheduledAt) post.scheduledAt = new Date(scheduledAt);
    if (req.file) post.mediaUrl = `/uploads/${req.file.filename}`;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", protect, async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!post) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
});

export default router;
