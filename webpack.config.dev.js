const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');


module.exports = {
    // entry: {
        // main: [
            // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000', './src/index.js'
        // ]},
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        port: process.env.PORT,
        host: process.env.HOST || '0.0.0.0',
        https: process.env.HTTPS,
        historyApiFallback: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'https://spotify-genius-backend.herokuapp.com/',
                // target: 'http://localhost:9090',
                pathRewrite: {'^/api': ''},
                changeOrigin: true,
                secure: false,
            }
        }
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: [/node_modules/, /server/]

                    },
                    {
                        test: /\.css$/,
                        use: [
                            { loader: 'style-loader'},
                            { 
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: true,
                                    localIdentName: '[name]_[local]_[hash:base64]'
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: (loader) => [
                                        require('postcss-flexbugs-fixes'),
                                        require('postcss-import')({ root: loader.resourcePath }),
                                        require('postcss-preset-env')({
                                            browsers: ['last 1 version',
                                            '> 1%',
                                            'maintained node versions',
                                            'not dead',
                                            'not ie < 9'
                                            ],
                                            autoprefixer: {
                                                flexbox: 'no-2009'
                                            }
                                        })
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit:10000,
                            name: 'assets/[name].[hash:8].[ext]'
                        }
                    },
                    {   
                        //Catch all assets that do not match loaders specification
                        loader: require.resolve('file-loader'),
                        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
                        options: {
                            name: '/assets/[name].[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new DotenvWebpackPlugin({
            path: './.env'
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            options: {
                'title': 'SpotifyGenius'
            },
            excludeChunks: ['server']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin()
    ]
};