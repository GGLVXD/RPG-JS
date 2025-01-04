import { defineConfig } from 'vite'
import canvasengine from '@canvasengine/compiler'

export default defineConfig({
  plugins: [canvasengine()],
  build: {
    target: 'esnext',
    sourcemap: true,
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index'
    },
    rollupOptions: {
      external: [/@rpgjs/, 'esbuild', 'simple-room-client']
    },
  }
})
