import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import Sitemap from 'vite-plugin-sitemap'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
      },
    }),
    Sitemap({
      hostname: 'https://cirqueira.com',
      dynamicRoutes: ['/', '/projetos'],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
    }),
  ],
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
            '@radix-ui/react-tooltip',
          ],
          icons: ['react-icons/si', 'react-icons/fa'],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const extType = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
        ecma: 2020,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    reportCompressedSize: false,
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['react-parallax-tilt'],
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
