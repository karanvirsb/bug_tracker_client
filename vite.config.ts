import { defineConfig } from "vite";
import refreshReact from "@vitejs/plugin-react-refresh";
import { VitePWA } from "vite-plugin-pwa";

import manifest from "./public/manifest.json";

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
    plugins: [
        refreshReact(),
        VitePWA({
            manifest,
            includeAssets: [
                "favicon.svg",
                "favicon.ico",
                "robots.txt",
                "apple-touch-icon.png",
            ],
            // devOptions: { enabled: true },
            workbox: {
                globPatterns: ["**/*.{js,css,html}", "**/*.{svg,png,jpg,gif}"],
            },
        }),
    ],
});
