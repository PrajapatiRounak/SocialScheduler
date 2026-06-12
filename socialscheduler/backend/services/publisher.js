/**
 * Publisher Service
 * ------------------
 * Right now this SIMULATES publishing to each platform.
 * To go LIVE: replace the body of each publishX() function with a real
 * API call (e.g. Twitter API v2, Instagram Graph API, LinkedIn API).
 * The rest of the app does not need to change — it only calls publishToPlatform().
 */

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function publishInstagram(post) {
  await delay(300);
  // REAL: POST to Instagram Graph API /media + /media_publish
  return { simulatedPostId: "ig_" + Math.random().toString(36).slice(2, 10) };
}

async function publishTwitter(post) {
  await delay(300);
  // REAL: POST https://api.twitter.com/2/tweets
  return { simulatedPostId: "tw_" + Math.random().toString(36).slice(2, 10) };
}

async function publishLinkedIn(post) {
  await delay(300);
  // REAL: POST https://api.linkedin.com/v2/ugcPosts
  return { simulatedPostId: "li_" + Math.random().toString(36).slice(2, 10) };
}

const handlers = {
  instagram: publishInstagram,
  twitter: publishTwitter,
  linkedin: publishLinkedIn,
};

export async function publishToPlatform(platform, post) {
  const handler = handlers[platform];
  if (!handler) throw new Error("Unsupported platform: " + platform);
  return handler(post);
}
