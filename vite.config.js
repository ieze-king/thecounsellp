import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg({ quality: 75 }),
        png: imageminPngquant({ quality: [0.6, 0.8] }),
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore', 'firebase/analytics'],
          'vendor-helmet':   ['react-helmet-async'],
        },
      },
    },
  },
});
