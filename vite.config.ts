import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

// ESM 환경에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // 안전한 포트 파싱
  const portEnv = env.VITE_DEV_PORT;
  const parsedPort = portEnv ? parseInt(portEnv.trim(), 10) : NaN;
  const port = Number.isFinite(parsedPort) ? parsedPort : 5173;
  
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
