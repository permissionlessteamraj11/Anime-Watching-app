import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const anime = await prisma.anime.findUnique({
      where: { id },
      include: {
        genres: true,
        studios: true,
        episodes: {
          orderBy: {
            number: "asc",
          },
        },
      },
    });

    if (!anime) {
      return NextResponse.json({ error: "Anime not found" }, { status: 404 });
    }

    return NextResponse.json(anime);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch anime" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { title, titleJp, synopsis, poster, banner, status, genres, studios } = body;

    const anime = await prisma.anime.update({
      where: { id },
      data: {
        title,
        titleJp,
        synopsis,
        poster,
        banner,
        status,
        genres: genres ? {
          set: [],
          connectOrCreate: genres.map((g: string) => ({
            where: { name: g },
            create: { name: g },
          })),
        } : undefined,
        studios: studios ? {
          set: [],
          connectOrCreate: studios.map((s: string) => ({
            where: { name: s },
            create: { name: s },
          })),
        } : undefined,
      },
    });

    return NextResponse.json(anime);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update anime" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.anime.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete anime" }, { status: 500 });
  }
}
