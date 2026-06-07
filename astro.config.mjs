// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://abbas-talebi.github.io",
  base: "/baqishelf-lab",

  integrations: [
    react(),
  ],
});
