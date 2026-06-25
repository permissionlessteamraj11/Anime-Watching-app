import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

const typeDefs = gql`
  type Genre {
    id: ID!
    name: String!
  }

  type Studio {
    id: ID!
    name: String!
  }

  type Video {
    id: ID!
    url: String!
    quality: String!
    format: String!
  }

  type Episode {
    id: ID!
    number: Int!
    title: String
    description: String
    airDate: String
    duration: Int
    videos: [Video]
  }

  type Anime {
    id: ID!
    title: String!
    titleJp: String
    synopsis: String!
    poster: String
    banner: String
    status: String
    rating: Float
    genres: [Genre]
    studios: [Studio]
    episodes: [Episode]
  }

  type Query {
    anime(id: ID!): Anime
    allAnime(limit: Int, skip: Int, status: String): [Anime]
    genres: [Genre]
    studios: [Studio]
  }
`;

const resolvers = {
  Query: {
    anime: (_: any, { id }: { id: string }) =>
      prisma.anime.findUnique({
        where: { id },
        include: { genres: true, studios: true, episodes: true },
      }),
    allAnime: (_: any, { limit = 20, skip = 0, status }: any) =>
      prisma.anime.findMany({
        where: status ? { status } : {},
        take: limit,
        skip: skip,
        include: { genres: true, studios: true },
        orderBy: { createdAt: "desc" },
      }),
    genres: () => prisma.genre.findMany(),
    studios: () => prisma.studio.findMany(),
  },
  Anime: {
    episodes: (parent: any) =>
      prisma.episode.findMany({
        where: { animeId: parent.id },
        orderBy: { number: "asc" },
      }),
  },
  Episode: {
    videos: (parent: any) =>
      prisma.video.findMany({
        where: { episodeId: parent.id },
      }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
