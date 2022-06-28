import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path = require('path')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: /^@\/(.+)/,
        replacement: path.resolve(__dirname, 'src') + '/$1',
      },
    ],
  },
})
