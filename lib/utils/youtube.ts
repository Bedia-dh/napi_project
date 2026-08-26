// Extracts a YouTube video ID from the URL shapes we actually use in the
// data (watch?v=, youtu.be/, /live/, /embed/). Returns null for anything
// else (e.g. mei.edu event pages), so callers can fall back to a plain link.
export function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/(^|\.)youtube\.com$/.test(u.hostname) && u.hostname !== "youtu.be") {
      return null;
    }
    if (u.hostname === "youtu.be") {
      return u.pathname.slice(1) || null;
    }
    if (u.pathname === "/watch") {
      return u.searchParams.get("v");
    }
    const match = u.pathname.match(/\/(embed|live)\/([^/?]+)/);
    if (match) return match[2];
    return null;
  } catch {
    return null;
  }
}

// Standard YouTube thumbnail CDN URL — no API key required. mqdefault is a
// fixed 320x180 (16:9) JPEG that YouTube generates for every video.
export function getYouTubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`;
}
