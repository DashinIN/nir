import { defineConfig } from 'vite';
import svgx from '@svgx/vite-plugin-react';
import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        svgx(),
        checker({
            eslint: {
                lintCommand: 'eslint "./src/**/*.{js,jsx}"',
            },
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
        }
    }
});
