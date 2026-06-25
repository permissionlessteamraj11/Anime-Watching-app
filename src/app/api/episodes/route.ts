import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const animeId = searchParams.get("animeId");

  if (!animeId) {
    return NextResponse.json({ error: "animeId is required" }, { status: 400 });
  }

  try {
    const episodes = await prisma.episode.findMany({
      where: { animeId },
      orderBy: { number: "asc" },
      include: {
        videos: true,
        subtitles: true,
      },
    });

    return NextResponse.json(episodes);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch episodes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { animeId, number, title, description, airDate, duration, videos, subtitles } = body;

    const episode = await prisma.episode.create({
      data: {
        animeId,
        number,
        title,
        description,
        airDate: airDate ? new Date(airDate) : null,
        duration,
        videos: {
          create: videos?.map((v: any) => ({
            url: v.url,
            quality: v.quality,
            format: v.format,
          })),
        },
        subtitles: {
          create: subtitles?.map((s: any) => ({
            url: s.url,
            language: s.language,
          })),
        },
      },
    });

    return NextResponse.json(episode, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create episode" }, { status: 500 });
  }
}
