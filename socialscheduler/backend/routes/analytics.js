import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Summary across all published posts
router.get("/summary", protect, async (req, res) => {
  const posts = await Post.find({ user: req.userId, status: "published" });

  const totals = posts.reduce(
    (acc, p) => {
      acc.views += p.analytics?.views || 0;
      acc.likes += p.analytics?.likes || 0;
      acc.engagement += p.analytics?.engagement || 0;
      return acc;
    },
    { views: 0, likes: 0, engagement: 0 }
  );

  const byPlatform = {};
  posts.forEach((p) => {
    p.platforms.forEach((pl) => {
      if (!byPlatform[pl]) byPlatform[pl] = { posts: 0, views: 0, likes: 0 };
      byPlatform[pl].posts += 1;
      byPlatform[pl].views += p.analytics?.views || 0;
      byPlatform[pl].likes += p.analytics?.likes || 0;
    });
  });

  res.json({
    totalPosts: posts.length,
    totalViews: totals.views,
    totalLikes: totals.likes,
    avgEngagement: posts.length ? (totals.engagement / posts.length).toFixed(1) : 0,
    byPlatform,
    posts: posts.map((p) => ({
      id: p._id,
      content: p.content.slice(0, 60),
      platforms: p.platforms,
      publishedAt: p.updatedAt,
      analytics: p.analytics,
    })),
  });
});

// Simulate fresh metrics for a post (e.g. "Refresh" button in demo)
router.post("/:id/refresh", protect, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, user: req.userId });
  if (!post) return res.status(404).json({ message: "Not found" });
  if (post.status !== "published")
    return res.status(400).json({ message: "Post not published yet" });

  post.analytics.views += Math.floor(Math.random() * 100);
  post.analytics.likes += Math.floor(Math.random() * 30);
  post.analytics.engagement = Math.min(
    100,
    post.analytics.engagement + Math.floor(Math.random() * 3)
  );
  await post.save();
  res.json(post.analytics);
});

export default router;
