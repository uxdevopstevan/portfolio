import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Local-only dev server bind settings (do not commit machine-specific IPs).
  // Create `.env.development.local` (gitignored via `*.local`) with e.g.:
  //   DEV_SERVER_HOST=10.42.0.234
  //   DEV_SERVER_PORT=5173
  const env = loadEnv(mode, process.cwd(), '')
  const devHost = env.DEV_SERVER_HOST?.trim()
  const devPort = Number(env.DEV_SERVER_PORT) || 5173

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // If unset, default to exposing dev server on the LAN (`true` => 0.0.0.0).
      host: devHost || true,
      port: devPort,
      strictPort: true,
    },
  }
})
