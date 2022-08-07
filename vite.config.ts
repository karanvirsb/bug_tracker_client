import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
    },
    preview: {
        port: 3000,
    },
    // This changes the out put dir from dist to build
    build: {
        outDir: "build",
    },
    plugins: [reactRefresh()],
});
