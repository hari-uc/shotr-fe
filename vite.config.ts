import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tsconfigPaths()],

    define: {
      'process.env': env
    },

    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
          // Clean chunks
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },

    server: {
      port: 3000,
      strictPort: true,
      host: true,
      open: true,
    },

    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  };
});

