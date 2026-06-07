// scripts/test-google.js

const response =
  await fetch(
    "https://www.google.com"
  );

console.log(response.status);