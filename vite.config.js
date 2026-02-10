/**
 * Vite Configuration
 * ==================
 * Build system for A1 Language App
 * 
 * @see REFACTORING_ROADMAP.md Phase 1
 */

import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  
  build: {
    outDir: 'dist',
    
    rollupOptions: {
      input: 'index.html',
      
      output: {
        // Code splitting for vocab data (lazy loadable in future)
        manualChunks: (id) => {
          // Group vocab files by unit ranges
          if (id.includes('vocab_cards_u01.5')) {
            return 'vocab-u01-5';
          }
          if (id.includes('vocab_cards_u01') || id.includes('vocab_cards_u02') || id.includes('vocab_cards_u03')) {
            return 'vocab-u01-u03';
          }
          if (id.includes('vocab_cards_u04') || id.includes('vocab_cards_u05') || id.includes('vocab_cards_u06')) {
            return 'vocab-u04-u06';
          }
          if (id.includes('vocab_cards_u07') || id.includes('vocab_cards_u08') || id.includes('vocab_cards_u09') || id.includes('vocab_cards_u10')) {
            return 'vocab-u07-u10';
          }
          // Group curriculum files
          if (id.includes('curriculum_')) {
            return 'curriculum';
          }
          // Group src/ ES modules
          if (id.includes('/src/utils/')) {
            return 'utils';
          }
          if (id.includes('/src/state/')) {
            return 'state';
          }
          if (id.includes('/src/components/')) {
            return 'components';
          }
          if (id.includes('/src/features/')) {
            return 'features';
          }
          if (id.includes('/src/games/')) {
            return 'games';
          }
          if (id.includes('/src/data/')) {
            return 'data';
          }
          // Group tiles
          if (id.includes('/src/tiles/')) {
            return 'tiles';
          }
        }
      }
    },
    
    // Use terser for better minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // Remove console in production (set false for dev)
        drop_debugger: true
      }
    },
    
    // Generate source maps for debugging
    sourcemap: true,
    
    // Warn if chunks are too large
    chunkSizeWarningLimit: 500  // KB
  },
  
  server: {
    port: 8000,
    open: true,  // Open browser on start
    
    // Handle service worker in dev mode
    headers: {
      'Service-Worker-Allowed': '/'
    }
  },
  
  preview: {
    port: 8000
  },
  
  // Resolve aliases for cleaner imports (future use)
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@utils': '/src/utils'
    }
  },
  
  // Define global constants
  define: {
    '__DEV__': JSON.stringify(process.env.NODE_ENV !== 'production'),
    '__VERSION__': JSON.stringify(process.env.npm_package_version || '1.0.0')
  }
});
