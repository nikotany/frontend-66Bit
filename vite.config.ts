import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  server: {
    host: "127.0.0.1",
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), svgr()],
});
