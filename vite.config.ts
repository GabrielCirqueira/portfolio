import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [react(), Sitemap({ hostname: 'https://cirqueira.com' })],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
          'radix-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-progress',
            '@radix-ui/react-slot',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssMinify: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
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
