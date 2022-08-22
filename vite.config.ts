import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: './src/setupTests.ts',
    include: [
      '**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      '**/spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    environment: 'jsdom',
  },
  define: {
    'process.env': {
      api_key: undefined,
    },
  },
  server: {
    port: 3000,
  },
});
