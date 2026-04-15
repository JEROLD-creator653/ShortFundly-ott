import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/demo-session";
import {
  addDemoUserMyListItem,
  getDemoUserMyList,
  removeDemoUserMyListItem
} from "@/lib/persistence/local-store";

type AddBody = {
  slug?: string;
  title?: string;
  thumbnail?: string;
  genre?: string;
  duration?: string;
  year?: number;
  rating?: number;
  premium?: boolean;
};

export async function GET(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const list = await getDemoUserMyList(session.userId);
  if (!list) {
    return NextResponse.json({ ok: false, message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, items: list });
}

export async function POST(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as AddBody;

  if (!body.slug || !body.title) {
    return NextResponse.json({ ok: false, message: "slug and title are required" }, { status: 400 });
  }

  const list = await addDemoUserMyListItem(session.userId, {
    slug: body.slug,
    title: body.title,
    thumbnail: body.thumbnail || "/images/poster-wings.svg",
    genre: body.genre || "Unknown",
    duration: body.duration || "0m",
    year: Number(body.year) || new Date().getFullYear(),
    rating: Number(body.rating) || 0,
    premium: Boolean(body.premium)
  });

  if (!list) {
    return NextResponse.json({ ok: false, message: "Unable to add item" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, items: list });
}

export async function DELETE(request: NextRequest) {
  const session = getSessionFromRequest(request);
  if (!session || session.role !== "user") {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug")?.trim();
  if (!slug) {
    return NextResponse.json({ ok: false, message: "slug is required" }, { status: 400 });
  }

  const list = await removeDemoUserMyListItem(session.userId, slug);
  if (!list) {
    return NextResponse.json({ ok: false, message: "Unable to remove item" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, items: list });
}
