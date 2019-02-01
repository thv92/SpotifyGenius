const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        hot: true,
        port: process.env.PORT,
        host: process.env.HOST
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/

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
                                        }),
                                        require('cssnano')()
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
        new HtmlWebpackPlugin({
            inject: true,
            template: './public/index.html',
            options: {
                'title': 'SpotifyGenius'
            }
        }),
        new CaseSensitivePathsPlugin()
    ]
};