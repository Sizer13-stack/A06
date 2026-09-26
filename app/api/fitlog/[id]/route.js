import { getFitlogList } from "@/lib/fitlogUpstream";

export async function GET(_request, { params }) {
  const { id } = await params;
  try {
    const list = await getFitlogList();
    const arr = Array.isArray(list) ? list : list?.data || list?.results || [];
    const match = arr.find((w) => String(w.id) === String(id));
    if (match) return Response.json(match);
    return Response.json({ error: "Not found" }, { status: 404 });
  } catch (err) {
    return Response.json(
      { error: "Failed to reach FitLog API", detail: String(err) },
      { status: 502 }
    );
  }
}