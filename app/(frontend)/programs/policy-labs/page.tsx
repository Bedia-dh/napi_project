import { redirect } from "next/navigation";

// "Policy Labs" was never a real NAPI program — the actual 4th program is
// NAPI-MEI Roundtables. This route now redirects there instead of 404ing
// for anyone who had the old link.
export default function PolicyLabsRedirect() {
  redirect("/programs/mei-roundtables");
}
