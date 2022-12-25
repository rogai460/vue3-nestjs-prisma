import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@/": `${__dirname}/src/components/`,
    },
  },
  build: {
    outDir: "../backend/public",
  },
  plugins: [vue()],
});
