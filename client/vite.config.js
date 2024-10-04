import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all IPs (equivalent to 0.0.0.0)
    port: 3000, // Optionally specify a port
    proxy: {
      "/api": {
        target: "http://192.168.0.118:5000", // Your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
