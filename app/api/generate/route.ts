import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || !["image", "text", "script"].includes(body.mode)) {
    return NextResponse.json({ message: "Invalid generation request." }, { status: 400 });
  }

  // Provider adapter goes here. For now the UI is fully wired to a mock backend,
  // which lets us deploy and test the product before paying for generations.
  return NextResponse.json({
    ok: true,
    status: "mock",
    message: "Prototype request accepted. Connect a video model API to generate the first real clip."
  });
}
