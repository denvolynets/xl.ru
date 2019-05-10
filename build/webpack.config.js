const { configUtils } = require('../webpack-config-utils.js');
const Optimize = false;
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const yargs = require('yargs');
const argv = yargs.boolean('disable-compression-plugin').argv;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const pugData = require('../src/templates/pugData.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	const prod = env.NODE_ENV === 'production';
	const outputPath = prod ? configUtils.outputPathProd : configUtils.outputPathDev;
	const consoleStats = {
		all: false,
		modules: true,
		maxModules: 0,
		errors: true,
		warnings: true,
		moduleTrace: true,
		errorDetails: true
	};
	return {
		mode: prod ? 'production' : 'development',
		devtool: prod ? 'none' : 'inline-source-map',
		context: path.resolve(__dirname, '../src'),
		cache: true,
		entry: {
			app: './app.js'
		},
		output: {
			path: path.resolve(__dirname, outputPath),
			publicPath: prod ? './' : '/',
			filename: `${configUtils.jsPath}/bundle.[name].js`,
			chunkFilename: `${configUtils.jsPath}/[name].js`
		},
		resolve: {
			alias: {
				'@': path.resolve(__dirname, '../src'),
				'$Styles': path.resolve(__dirname, '../src/assets/styles/'),
				'$Scripts': path.resolve(__dirname, '../src/assets/scripts/'),
				'$Templates': path.resolve(__dirname, '../src/templates/'),
				'$Assets': path.resolve(__dirname, '../src/assets/'),
				'$Blocks': path.resolve(__dirname, '../src/templates/blocks'),
				'$Components': path.resolve(__dirname, '../src/templates/components')
			}
		},
		devServer: {
			contentBase: path.resolve(__dirname, '../src'),
			overlay: true,
			compress: true,
			port: 9090,
			stats: consoleStats,
			open: false
		},
		stats: consoleStats,
		performance: {
			hints: false
		},
		module: {
			rules: (function(argv) {
				let rules = [{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true
						}
					}]
				},
				{
					test: /\.s?css$/,
					use: [
						'style-loader',
						MiniCssExtractPlugin.loader,
						'css-loader?sourceMap',
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')],
								sourceMap: !prod
							}
						},
						'sass-loader?sourceMap',
						'import-glob-loader'
					]
				},
				{
					test: /\.svg$/,
					include: [
						path.resolve(__dirname, '../src/assets/images/svg/')
					],
					loader: 'svg-sprite-loader',
					options: {
						extract: true,
						spriteFilename: 'assets/images/svg-sprite/sprite.svg'
					}
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
					loader: 'url-loader',
					exclude: [
						path.resolve(__dirname, '../src/assets/images/svg/'),
						path.resolve(__dirname, '../src/assets/fonts/'),
						path.resolve(__dirname, `${outputPath}/assets/svg-sptire/`)
					],
					options: {
						emitFile: false,
						limit: 3000,
						name: '../../[path][name].[ext]'
					}
				},
				{
					test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
					include: [
						path.resolve(__dirname, '../src/assets/fonts/')
					],
					loader: 'url-loader',
					options: {
						limit: 5000,
						publicPath: prod ? '../../' : '/',
						name: prod ? '[path][name].[ext]' : '../[path][name].[ext]'
					}
				},
				{
					test: /\.(mp4)(\?.*)?$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'assets/videos/[name].[hash:7].[ext]'
					}
				},
				{
					test: /\.pug$/,
					use: [{
						loader: 'file-loader',
						options: {
							name: `${configUtils.htmlFilesPath}[name].html`
						}
					},
					{
						loader: 'pug-html-loader',
						options: {
							pretty: false,
							exports: false,
							data: {
								$data: pugData
							}
						}
					}
					]
				}
				];

				if (configUtils.esLint) {
					rules.push({
						test: /\.js$/,
						exclude: /node_modules/,
						use: [{
							loader: 'eslint-loader'
						}]
					});
				}
				return rules;
			})(argv)
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'bundle.vendors',
						enforce: true,
						chunks: 'all'
					}
				}
			}
		},
		plugins: (function(argv) {
			let plugins = [
				new webpack.HashedModuleIdsPlugin(),
				new CleanWebpackPlugin(),
				new SpriteLoaderPlugin({
					plainSprite: true,
					spriteAttrs: {
						id: 'svg-sprite'
					}
				}),
				new CopyWebpackPlugin([{
					from: 'assets/images',
					to: 'assets/images'
				}]),
				new MiniCssExtractPlugin({
					filename: `${configUtils.cssPath}/bundle.[name].css`,
					chunkFilename: `${configUtils.cssPath}/[name].css`
				}),
				new WebpackBuildNotifierPlugin({
					title: 'RedSoft',
					suppressSuccess: 'initial',
					activateTerminalOnError: true
				}),
				new FriendlyErrorsWebpackPlugin({
					compilationSuccessInfo: {
						messages: [prod ? `Build complete at folder "${configUtils.outputPathProd.replace(/\./g, '')}"` : 'You server is running here http://localhost:9090']
					}
				}),
				new webpack.ProvidePlugin({
					'window.jQuery': path.resolve(__dirname, '../node_modules/jquery/dist/jquery'),
					'window.$': path.resolve(__dirname, '../node_modules/jquery/dist/jquery'),
					'jQuery': path.resolve(__dirname, '../node_modules/jquery/dist/jquery'),
					'$': path.resolve(__dirname, '../node_modules/jquery/dist/jquery'),
					'Swiper': path.resolve(__dirname, '../node_modules/swiper/dist/js/swiper')
				})
			];

			if (argv.env.NODE_ENV === 'production') {
				plugins.push(
					new OptimizeCssAssetsPlugin({
						cssProcessor: require('cssnano'),
						cssProcessorPluginOptions: {
							preset: ['default', {
								discardComments: {
									removeAll: true
								}
							}]
						},
						canPrint: true
					}),
					new ImageminPlugin({
						pngquant: {
							quality: '70'
						},
						test: /\.(jpe?g|png|gif)$/i
					})
				);
			}

			if (configUtils.styleLint) {
				plugins.push(new StyleLintPlugin());
			}

			if (Optimize) { //! работает не всегда хорошо, нужно тестировать
				plugins.push(
					new HardSourceWebpackPlugin({
						environmentHash: {
							root: process.cwd(),
							directories: ['assets/templates', 'assets/fonts', 'assets/libs', 'assets/styles', 'assets/images', 'assets/scripts']
						}
					}),
					new ParallelUglifyPlugin({
						cacheDir: path.join('node_modules', '.cache', 'parallel-uglify'),
						sourceMap: !prod,
						uglifyES: {}
					})
				);
			}
			return plugins;
		})(argv)
	};
};
