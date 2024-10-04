import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // Make sure the base path is root
  plugins: [react()],
  build: {
    outDir: "docs", // GitHub Pages expects the output in 'docs'
  },
});
