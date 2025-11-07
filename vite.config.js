import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/vn-api": {
        target: "https://provinces.open-api.vn",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/vn-api/, ""),
      },
    },
  },
});
