// scripts/test-fetch.js

const response =
  await fetch(
    "https://api.github.com"
  );

console.log(
  response.status
);