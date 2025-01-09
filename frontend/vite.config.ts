import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist", // Explicitly set the output directory
    assetsDir: "assets", // Specify directory for assets within the output
  },
  server: {
    port: 3000, // Optional: Set development server port
  },
});
