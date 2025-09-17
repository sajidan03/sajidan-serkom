import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    esbuild: {
        jsx: 'automatic',
    },
});


// import tailwindcss from '@tailwindcss/vite';
// import react from '@vitejs/plugin-react';
// import laravel from 'laravel-vite-plugin';
// import { defineConfig } from 'vite';
// import path from 'path';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.tsx'],
//             ssr: 'resources/js/ssr.tsx',
//             refresh: true,
//         }),
//         react(),
//         tailwindcss(),
//     ],

//     server: {
//         host: '0.0.0.0',
//         port: 5173,
//         strictPort: true,
//         hmr: {
//             host: '192.168.130.251',
//         },
//     },

//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, 'resources/js'),
//         },
//     },
//     esbuild: {
//         jsx: 'automatic',
//     },
// });
