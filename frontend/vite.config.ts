import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: process.env.NODE_ENV === 'production' ? '/OLXgithubpage/' : '/', // Change to your GitHub repo name

  server: {

    host: "::",

    port: 8080,

    proxy: {

      '/api': {

        target: 'http://192.168.29.30:3000',

        changeOrigin: true,

      },

    },

  },

  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
