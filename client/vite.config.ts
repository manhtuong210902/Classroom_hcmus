import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import EnvironmentPlugin from "vite-plugin-environment";

const root = resolve(__dirname, "src");
const icon = resolve(__dirname, "src/assets/icon");
const img = resolve(__dirname, "src/assets/imgs/");

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@src": root,
            "@icon": icon,
            "@image": img,
            "@root": __dirname, // Add this line to configure the @root alias
        },
    },
    css: {
        postcss: {
            plugins: [tailwindcss, autoprefixer],
        },
    },
    plugins: [react(), EnvironmentPlugin("all")],
});
