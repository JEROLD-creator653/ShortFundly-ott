import { NextResponse } from "next/server";

type SubmitPayload = {
  title?: string;
  genre?: string;
  note?: string;
  creatorName?: string;
  email?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SubmitPayload;

  if (!body.title || !body.genre || !body.email) {
    return NextResponse.json(
      { ok: false, message: "title, genre, and email are required" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    submissionId: `SF-${Date.now()}`,
    message: "Submission received"
  });
}
