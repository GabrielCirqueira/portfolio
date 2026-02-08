import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@app/layouts', replacement: path.resolve(__dirname, 'src/layouts') },
      { find: '@app/contexts', replacement: path.resolve(__dirname, 'src/contexts') },
      { find: '@app/pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@app/components', replacement: path.resolve(__dirname, 'src/components') },
      { find: /^@app\/(.*)/, replacement: path.resolve(__dirname, 'src/$1') },
      { find: '@app', replacement: path.resolve(__dirname, 'src') },

      { find: /^@pages\/(.*)/, replacement: path.resolve(__dirname, 'src/pages/$1') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },

      { find: '@shadcn/lib', replacement: path.resolve(__dirname, 'src/shadcn/lib') },
      { find: '@shadcn/hooks', replacement: path.resolve(__dirname, 'src/shadcn/hooks') },
      {
        find: '@shadcn/layout',
        replacement: path.resolve(__dirname, 'src/shadcn/components/ui/layout'),
      },
      {
        find: '@shadcn/typography',
        replacement: path.resolve(__dirname, 'src/shadcn/components/ui/typography'),
      },
      {
        find: '@shadcn/components',
        replacement: path.resolve(__dirname, 'src/shadcn/components/ui'),
      },
      {
        find: /^@shadcn\/(.*)/,
        replacement: path.resolve(__dirname, 'src/shadcn/components/ui/$1'),
      },
      { find: '@shadcn', replacement: path.resolve(__dirname, 'src/shadcn/components/ui') },

      { find: /^@\/(.*)/, replacement: path.resolve(__dirname, 'src/$1') },
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
