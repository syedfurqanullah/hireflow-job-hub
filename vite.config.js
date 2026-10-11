import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
 const env = loadEnv(mode, process.cwd(), '')
 const appId = env.ADZUNA_APP_ID || env.VITE_ADZUNA_APP_ID
 const appKey = env.ADZUNA_APP_KEY || env.VITE_ADZUNA_APP_KEY
 const adzunaDevProxy = {
  name: 'hireflow-adzuna-dev-proxy',
  configureServer(server) {
   server.middlewares.use(async (request, response, next) => {
    const requestUrl = new URL(request.url || '/', 'http://localhost')
    const apiPrefix = '/api/adzuna/'

    if (!requestUrl.pathname.startsWith(apiPrefix)) {
     next()
     return
    }

    if (request.method !== 'GET') {
     response.writeHead(405, { Allow: 'GET', 'Content-Type': 'application/json' })
     response.end(JSON.stringify({ error: 'Method not allowed.' }))
     return
    }

    if (!appId || !appKey) {
     response.writeHead(500, { 'Content-Type': 'application/json' })
     response.end(JSON.stringify({
      error: 'Adzuna credentials are missing. Configure ADZUNA_APP_ID and ADZUNA_APP_KEY in the local environment, then restart Vite.',
     }))
     return
    }

    const endpoint = requestUrl.pathname.slice(apiPrefix.length)
    if (!endpoint.startsWith('jobs/')) {
     response.writeHead(400, { 'Content-Type': 'application/json' })
     response.end(JSON.stringify({ error: 'Invalid Adzuna endpoint.' }))
     return
    }

    const upstreamUrl = new URL(`https://api.adzuna.com/v1/api/${endpoint}`)
    upstreamUrl.search = requestUrl.search
    upstreamUrl.searchParams.set('app_id', appId)
    upstreamUrl.searchParams.set('app_key', appKey)

    try {
     const upstreamResponse = await fetch(upstreamUrl)
     const body = await upstreamResponse.text()
     response.writeHead(upstreamResponse.status, {
      'Cache-Control': 'no-store',
      'Content-Type': upstreamResponse.headers.get('content-type') || 'application/json',
     })
     response.end(body || JSON.stringify({ error: 'Adzuna returned an empty response.' }))
    } catch {
     response.writeHead(502, { 'Content-Type': 'application/json' })
     response.end(JSON.stringify({ error: 'Could not reach the Adzuna service from the Vite server.' }))
    }
   })
  },
 }

 return {
  plugins: [react(), tailwindcss(), adzunaDevProxy],
 }
})
