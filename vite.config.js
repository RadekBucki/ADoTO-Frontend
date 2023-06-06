import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';

config();

export default defineConfig({
  plugins: [react()],
});
