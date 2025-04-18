import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Chat-app-FE/',
  server: {
    https: {
      key: fs.readFileSync(
        path.resolve(
          '/Users/athenkosi.mamfenguintegrove.com/Desktop',
          'key.pem'
        )
      ),
      cert: fs.readFileSync(
        path.resolve(
          '/Users/athenkosi.mamfenguintegrove.com/Desktop',
          'cert.pem'
        )
      ),
    },
  },
});
