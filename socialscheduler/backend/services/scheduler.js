import cron from "node-cron";
import Post from "../models/Post.js";
import { publishToPlatform } from "./publisher.js";

/**
 * Runs every minute. Finds posts whose scheduledAt <= now and are still
 * "scheduled", then publishes them to each platform and seeds analytics.
 */
async function processDuePosts() {
  const now = new Date();
  const duePosts = await Post.find({ status: "scheduled", scheduledAt: { $lte: now } });

  for (const post of duePosts) {
    const results = [];
    for (const platform of post.platforms) {
      try {
        const r = await publishToPlatform(platform, post);
        results.push({
          platform,
          status: "published",
          publishedAt: new Date(),
          simulatedPostId: r.simulatedPostId,
        });
      } catch (err) {
        results.push({ platform, status: "failed", error: err.message });
      }
    }

    const anyPublished = results.some((r) => r.status === "published");
    post.platformResults = results;
    post.status = anyPublished ? "published" : "failed";

    // Seed simulated analytics on publish (grows over time via analytics endpoint)
    if (anyPublished) {
      post.analytics = {
        views: Math.floor(Math.random() * 200) + 50,
        likes: Math.floor(Math.random() * 50) + 5,
        engagement: Math.floor(Math.random() * 8) + 1,
      };
    }

    await post.save();
    console.log(`📤 Published post ${post._id} → ${post.platforms.join(", ")}`);
  }
}

export function startScheduler() {
  cron.schedule("* * * * *", () => {
    processDuePosts().catch((e) => console.error("Scheduler error:", e.message));
  });
  console.log("⏰ Scheduler started (runs every minute)");
}
