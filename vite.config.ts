import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vercel from 'vite-plugin-vercel';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		vercel(),
		VitePWA({
			includeAssets: [
				'favicon.ico',
				'android-chrome-192x192.png',
				'android-chrome-512x512.png',
				'apple-touch-icon.png',
				'favicon-16x16.png',
				'favicon-32x32.png'
			],
			manifest: {
				name: 'Yilidirm Beyazit Camii',
				short_name: 'Camii',
				description: 'Prayer times and mosque information for Yildirim Beyazit Camii',
				start_url: '/new/',
				theme_color: '#0f172a',
				icons: [
					{
						src: '/favicon.ico',
						sizes: '16x16',
						type: 'image/x-icon'
					},
					{
						src: '/android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/apple-touch-icon.png',
						sizes: '180x180',
						type: 'image/png'
					},
					{
						src: '/favicon-16x16.png',
						sizes: '16x16',
						type: 'image/png'
					},
					{
						src: '/favicon-32x32.png',
						sizes: '32x32',
						type: 'image/png'
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			components: path.resolve('./src/components'),
			lib: path.resolve('./src/lib')
		}
	},
	server: {
		port: 3000
	},
	vercel: {
		rewrites: [
			{
				source: '/(.*)',
				destination: '/'
			}
		],
		headers: [
			{
				source: '/(.*)',
				headers: [{ key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' }]
			}
		]
	}
});
