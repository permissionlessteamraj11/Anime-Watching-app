import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const genre = searchParams.get("genre");
  const search = searchParams.get("search");
  const limit = parseInt(searchParams.get("limit") || "20");
  const skip = parseInt(searchParams.get("skip") || "0");

  try {
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { titleJp: { contains: search, mode: "insensitive" } },
      ];
    }
    if (genre) {
      where.genres = {
        some: {
          name: genre,
        },
      };
    }

    const anime = await prisma.anime.findMany({
      where,
      take: limit,
      skip: skip,
      include: {
        genres: true,
        studios: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const total = await prisma.anime.count({ where });

    return NextResponse.json({ anime, total });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch anime" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, titleJp, synopsis, poster, banner, status, genres, studios } = body;

    const anime = await prisma.anime.create({
      data: {
        title,
        titleJp,
        synopsis,
        poster,
        banner,
        status,
        genres: {
          connectOrCreate: genres.map((g: string) => ({
            where: { name: g },
            create: { name: g },
          })),
        },
        studios: {
          connectOrCreate: studios.map((s: string) => ({
            where: { name: s },
            create: { name: s },
          })),
        },
      },
    });

    return NextResponse.json(anime, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create anime" }, { status: 500 });
  }
}
