import "dotenv/config";

const url =
  `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=Interstellar`;

console.log(url);

const response =
  await fetch(url);

console.log(
  "STATUS:",
  response.status
);

const data =
  await response.json();

console.log(
  data.results?.[0]
);