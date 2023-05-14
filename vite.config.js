import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';
    return {

        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/react/react_app.jsx'],
                refresh: true,
            }),
        ],
        build: {
            rollupOptions: {
                output: {
                    manualChunks: isProduction ? undefined : undefined,
                },
            },
        },
    };
});