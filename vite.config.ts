import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import * as styleImport from 'vite-plugin-style-import'
import { resolve } from 'path'

// https://vitejs.dev/config/
const pathResolve = (dir: string) => {
  return resolve(__dirname, ".", dir)
}
export default defineConfig({
  server: {
    port: 3006,
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
    styleImport.createStyleImportPlugin({
      resolves: [
        styleImport.ElementPlusResolve()
      ],
    })
  ],
  resolve: {
    alias: {
      '@': pathResolve("src")
    }
  },
  base: '/',
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'xp-workbench-layout',
      fileName: (format) => `xp-workbench-layout.${format}.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'element-plus',
        '@element-plus/icons-vue',
        'vue-router'
      ],
      output: {
        globals: {
          vue: 'Vue',
          'element-plus': 'elementPlus',
          'vue-router': 'vue-router',
          '@element-plus/icons-vue': '@element-plus/icons-vue'
        },
        assetFileNames: 'layout.css'
      }
    }
  }
})
