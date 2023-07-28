import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    headers: {
      "Cache-Control": "public, max-age=600",
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
