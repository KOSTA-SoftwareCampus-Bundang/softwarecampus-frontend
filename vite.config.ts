import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const port = Number(env.VITE_DEV_PORT ?? 5173);
  const host = env.VITE_DEV_HOST ?? '127.0.0.1';

  return {
    server: {
      port,
      host,
      strictPort: true
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.')
      }
    }
  };
});
