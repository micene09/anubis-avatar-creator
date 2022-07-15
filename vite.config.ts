import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	base: "/anubis-avatar-creator/",
	server: { open: true },
	resolve: {
		alias: [
		{
			find: /^@\/(.+)/,
			replacement: path.resolve(__dirname, 'src') + '/$1',
		},
		],
	},
})
