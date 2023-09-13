import {defineConfig} from 'vite';
// import {viteSingleFile} from 'vite-plugin-singlefile';
// import {minify as minifyHtml} from 'html-minifier-terser';
// import minifyLiterals from 'rollup-plugin-minify-template-literals';
// import {VitePWA} from 'vite-plugin-pwa';

const DEV_MODE = process.env.NODE_ENV == 'development';

const plugins = [];
if (!DEV_MODE) {
	try {
		plugins.push(minifyLiterals());
	} catch (e) {}
	try {
		// plugins.push(
		// 	viteSingleFile({
		// 		useRecommendedBuildConfig: false,
		// 	})
		// );
	} catch (e) {}
	plugins.push(
		{
		name: 'minify final index',
		apply: 'build',
		transform(src, id) {
			if (/index.html$/.test(id)) {
					return {
						code: minifyHtml(src, {
							collapseWhitespace: true,
							minifyCSS: true,
							minifyJS: true,
							removeComments: true,
						}),
						map: null,
					};
			}
		},
	}
	);
}

export default defineConfig({
	base: './',
	build: {
		// outDir: 'dist',
		assetsInlineLimit: 6000,
		// emptyOutDir: false,
		minify: 'terser',
		terserOptions: {
			format: {
				comments: false,
			},
		},
	},
	//   server: {
	//     hmr: false,
	//   },
	plugins: [
		...plugins,
		// terser(),
		// basicSSL(),
		// VitePWA({
		// 	registerType: 'autoUpdate',
		// 	includeAssets: ['*.png'],
		// 	manifest: {
		// 		icons: [
		// 			{
		// 				src: 'pwa-64x64.png',
		// 				sizes: '64x64',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'pwa-192x192.png',
		// 				sizes: '192x192',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'pwa-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'any',
		// 			},
		// 			{
		// 				src: 'maskable-icon-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 				purpose: 'maskable',
		// 			},
		// 		],
		// 	},
		// }),
	],
});
