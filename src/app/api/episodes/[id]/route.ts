import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const episode = await prisma.episode.findUnique({
      where: { id },
      include: {
        anime: true,
        videos: true,
        subtitles: true,
      },
    });

    if (!episode) {
      return NextResponse.json({ error: "Episode not found" }, { status: 404 });
    }

    return NextResponse.json(episode);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch episode" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { number, title, description, airDate, duration } = body;

    const episode = await prisma.episode.update({
      where: { id },
      data: {
        number,
        title,
        description,
        airDate: airDate ? new Date(airDate) : undefined,
        duration,
      },
    });

    return NextResponse.json(episode);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update episode" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.episode.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete episode" }, { status: 500 });
  }
}
