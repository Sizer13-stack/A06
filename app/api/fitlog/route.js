import { getFitlogList } from "@/lib/fitlogUpstream";

export async function GET() {
  try {
    const data = await getFitlogList();
    return Response.json(data);
  } catch (err) {
    return Response.json(
      { error: "Failed to reach FitLog API", detail: String(err) },
      { status: 502 }
    );
  }
}