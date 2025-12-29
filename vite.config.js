import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Minification & Compression
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better compression
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Code Splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          // GSAP only loaded if CardNav is used (currently not used, so won't be in bundle)
          // 'gsap-vendor': ['gsap'],
        },
        compact: true, // Compact output
      },
    },
    // Asset Optimization
    assetsInlineLimit: 2048, // Smaller limit to reduce inline assets
    cssCodeSplit: true,
    // Source maps only in dev
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false, // Faster builds
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'gsap'],
    exclude: [], // Ensure all dependencies are optimized
  },
  // Improve tree shaking
  esbuild: {
    treeShaking: true,
    legalComments: 'none', // Remove all comments
  },
})
