import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const coverTypeSchema = z
  .enum([
    "poster",
    "square",
  ])
  .default("poster");

const games = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/games",
  }),
  schema: z.object({
    title: z.string(),
    personal_rating: z.number(),
    story_rating: z.number().optional(),
    gameplay_rating: z.number().optional(),
    music_rating: z.number().optional(),
    graphics_rating: z.number().optional(),
    technical_rating: z.number().optional(),
    metacritic: z.number().optional(),
    opencritic: z.number().optional(),
    steam_rating: z.number().optional(),
    status: z.enum(["completed", "playing", "paused", "backlog", "dropped"]),
    year: z.number(),
    date_started: z.coerce.date().optional(),
    date_finished: z.coerce.date().optional(),
    platforms: z.array(z.string()).optional(),
    completion_percentage: z.number().optional(),
    achievements_unlocked: z.number().optional(),
    achievements_total: z.number().optional(),
    developer: z.string().optional(),
    publisher: z.string().optional(),
    generation: z.number().optional(),
    genres: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),

cover_type: coverTypeSchema,
    summary: z.string().optional(),
  }),
});

const movies = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/movies",
  }),
  schema: z.object({
    title: z.string(),
    personal_rating: z.number(),
    year: z.number(),
    status: z.enum([
  "watched",
  "dropped",
  "watching",
  "planned",
]),
    date_finished: z.coerce.date().optional(),
    genres: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),

cover_type: coverTypeSchema,
    director: z.string().optional(), // فقط یک بار
    summary: z.string().optional(),
    runtime: z.number().optional(),
    country: z.string().optional(),
    language: z.string().optional(),
    tmdb_rating: z.number().optional(),
    imdb_rating: z.number().optional(),
  }),
});

const series = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/series",
  }),
  schema: z.object({
    title: z.string(),
    personal_rating: z.number(),
    year: z.number(),
    status: z.enum([
  "completed",
  "watching",
  "paused",
  "planned",
  "dropped"
]),
    seasons: z.number().optional(),
    episodes: z.number().optional(),
    date_watched: z.coerce.date().optional(), // اصلاح شده از date_finished به date_watched
    genres: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),

cover_type: coverTypeSchema,
    summary: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/books",
  }),
  schema: z.object({
    title: z.string(),
    personal_rating: z.number(),
    year: z.number(),
    status: z.enum([
  "completed",
  "reading",
  "planned",
  "dropped"
]),
    author: z.string().optional(),
    pages: z.number().optional(),
    date_finished: z.coerce.date().optional(),
    genres: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),

cover_type: coverTypeSchema,
    summary: z.string().optional(),
  }),
});

const music = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/music",
  }),
  schema: z.object({
    title: z.string(),
    personal_rating: z.number(),
    year: z.number(),
    artist: z.string().optional(),
    album: z.string().optional(),
    status: z.enum([
  "listened",
  "listening",
  "planned"
]),
    date_listened: z.coerce.date().optional(),
    genres: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    cover: z.string().optional(),

cover_type: coverTypeSchema,
    summary: z.string().optional(),
  }),
});

export const collections = {
  games,
  movies,
  series,
  books,
  music,
};