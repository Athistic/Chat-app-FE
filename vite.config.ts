import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Check if we're in development mode
const isLocalDev = process.env.NODE_ENV !== 'production';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Chat-app-FE/',
  server: isLocalDev
    ? {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
          cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
        },
      }
    : undefined, // No HTTPS config in production
});
