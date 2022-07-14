import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
    // This changes the out put dir from dist to build
    build: {
        outDir: "build",
    },
    plugins: [reactRefresh()],
});
