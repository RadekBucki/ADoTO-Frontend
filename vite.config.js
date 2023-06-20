import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';

config();

export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 3000,
    },
    plugins: [react()],
});
