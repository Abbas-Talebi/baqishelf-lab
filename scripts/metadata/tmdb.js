import "dotenv/config";

const API_KEY =
  process.env.TMDB_API_KEY;

export async function searchMovie(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  const data = await response.json();

  return data.results ?? [];
}