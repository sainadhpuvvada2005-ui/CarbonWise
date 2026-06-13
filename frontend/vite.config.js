import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/CarbonWise/',
  plugins: [react()],
  test: {
    setupFiles: "./src/test/setup.js",
    globals: true
  }
});
