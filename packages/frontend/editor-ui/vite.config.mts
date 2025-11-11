import vue from '@vitejs/plugin-vue';
import { posix as pathPosix, resolve, sep as pathSep } from 'path';
import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgLoader from 'vite-svg-loader';
import istanbul from 'vite-plugin-istanbul';
import { sentryVitePlugin } from '@sentry/vite-plugin';

import { vitestConfig } from '@aura/vitest-config/frontend';
import icons from 'unplugin-icons/vite';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import legacy from '@vitejs/plugin-legacy';
import browserslist from 'browserslist';
import { isLocaleFile, sendLocaleUpdate } from './vite/i18n-locales-hmr-helpers';
import { nodePopularityPlugin } from './vite/vite-plugin-node-popularity.mjs';

const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';

const { NODE_ENV } = process.env;

const browsers = browserslist.loadConfig({ path: process.cwd() });

const packagesDir = resolve(__dirname, '..', '..');

const alias = [
	{ find: '@', replacement: resolve(__dirname, 'src') },
	{ find: 'stream', replacement: 'stream-browserify' },
	// Ensure bare imports resolve to sources (not dist)
	{ find: '@aura/i18n', replacement: resolve(packagesDir, 'frontend', '@aura', 'i18n', 'src') },
	{
		find: /^@aura\/chat(.+)$/,
		replacement: resolve(packagesDir, 'frontend', '@aura', 'chat', 'src$1'),
	},
	{
		find: /^@aura\/api-requests(.+)$/,
		replacement: resolve(packagesDir, 'frontend', '@aura', 'api-requests', 'src$1'),
	},
	{
		find: /^@aura\/composables(.+)$/,
		replacement: resolve(packagesDir, 'frontend', '@aura', 'composables', 'src$1'),
	},
	{
		find: /^@aura\/constants(.+)$/,
		replacement: resolve(packagesDir, '@aura', 'constants', 'src$1'),
	},
	{
		find: /^@aura\/design-system(.+)$/,
		replacement: resolve(packagesDir, 'frontend', '@aura', 'design-system', 'src$1'),
	},
	{
		find: /^@aura\/i18n(.+)$/,
		replacement: resolve(packagesDir, 'frontend', '@aura', 'i18n', 'src$1'),
	},
	{
		find: /^@aura\/stores(.+)$/,
		replacement: resolve(packagesDir, 'frontend', '@aura', 'stores', 'src$1'),
	},
	{
		find: /^@aura\/utils(.+)$/,
		replacement: resolve(packagesDir, '@aura', 'utils', 'src$1'),
	},
	...['orderBy', 'camelCase', 'cloneDeep', 'startCase'].map((name) => ({
		find: new RegExp(`^lodash.${name}$`, 'i'),
		replacement: `lodash/${name}`,
	})),
	{
		find: /^lodash\.(.+)$/,
		replacement: 'lodash/$1',
	},
	{
		// For sanitize-html
		find: 'source-map-js',
		replacement: resolve(__dirname, 'vite/source-map-js-shim'),
	},
];

const { RELEASE: release } = process.env;

const plugins: UserConfig['plugins'] = [
	nodePopularityPlugin(),
	icons({
		compiler: 'vue3',
		autoInstall: true,
	}),
	// Add istanbul coverage plugin for E2E tests
	...(process.env.BUILD_WITH_COVERAGE === 'true'
		? [
				istanbul({
					include: 'src/**/*',
					exclude: ['node_modules', 'tests/', 'dist/'],
					extension: ['.js', '.ts', '.vue'],
					forceBuildInstrument: true,
					requireEnv: false,
				}),
			]
		: []),
	viteStaticCopy({
		targets: [
			{
				src: pathPosix.resolve('node_modules/web-tree-sitter/tree-sitter.wasm'),
				dest: resolve(__dirname, 'dist'),
			},
			{
				src: pathPosix.resolve('node_modules/curlconverter/dist/tree-sitter-bash.wasm'),
				dest: resolve(__dirname, 'dist'),
			},
		],
	}),
	vue(),
	svgLoader({
		svgoConfig: {
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							// disable a default plugin
							cleanupIds: false,
							// preserve viewBox for scalability
							removeViewBox: false,
						},
					},
				},
			],
		},
	}),
	legacy({
		modernTargets: browsers,
	}),
	{
		name: 'Insert config script',
		transformIndexHtml: (html, ctx) => {
			// Skip config tags when using Vite dev server. Otherwise the BE
			// will replace it with the actual config script in cli/src/commands/start.ts.
			return ctx.server
				? html
						.replace('%CONFIG_TAGS%', '')
						.replaceAll('/{{BASE_PATH}}', '//localhost:5678')
						.replaceAll('/{{REST_ENDPOINT}}', '/rest')
				: html;
		},
	},
	// For sanitize-html
	nodePolyfills({
		include: ['fs', 'path', 'url', 'util', 'timers'],
	}),
	{
		name: 'i18n-locales-hmr',
		configureServer(server) {
			const localesDir = resolve(packagesDir, 'frontend', '@aura', 'i18n', 'src', 'locales');
			server.watcher.add(localesDir);

			// Only emit for add/unlink; change events are handled in handleHotUpdate
			server.watcher.on('all', (event, file) => {
				if ((event === 'add' || event === 'unlink') && isLocaleFile(file)) {
					sendLocaleUpdate(server, file);
				}
			});
		},
		handleHotUpdate(ctx) {
			const { file, server } = ctx;
			if (!isLocaleFile(file)) return;
			sendLocaleUpdate(server, file);
			// Swallow default HMR for this file to prevent full page reloads
			return [];
		},
	},
	...(release
		? [
				sentryVitePlugin({
					org: 'n8nio',
					project: 'instance-frontend',
					authToken: process.env.SENTRY_AUTH_TOKEN,
					telemetry: false,
					release: {
						name: `n8n@${release}`,
					},
				}),
			]
		: []),
];

const target = browserslistToEsbuild(browsers);

export default mergeConfig(
	defineConfig({
		define: {
			// This causes test to fail but is required for actually running it
			// ...(NODE_ENV !== 'test' ? { 'global': 'globalThis' } : {}),
			...(NODE_ENV === 'development' ? { 'process.env': {} } : {}),
			BASE_PATH: `'${publicPath}'`,
		},
		plugins,
		resolve: { alias },
		base: publicPath,
		envPrefix: ['VUE', 'N8N_ENV_FEAT'],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: [
						'',
						'@use "@/app/css/_variables.scss" as *;',
						'@use "@aura/design-system/css/mixins" as mixins;',
					].join('\n'),
				},
			},
		},
		build: {
			minify: !!release,
			sourcemap: !!release,
			target,
		},
		optimizeDeps: {
			esbuildOptions: {
				target,
			},
		},
		worker: {
			format: 'es',
		},
	}),
	vitestConfig,
);
