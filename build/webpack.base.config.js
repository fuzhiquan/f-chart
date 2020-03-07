const path = require('path')
const merge = require('webpack-merge')
const devConf = require('./webpack.dev.config')
const proConf = require('./webpack.pro.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
    const isDev = env.development

    const base = {
        entry: {
            index: path.resolve(__dirname, '../src/index.js')
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            filename: 'bundle.js'
        },
        externals: {
            AMap: 'AMap',
            AMapUI: 'AMapUI',
            echarts: 'echarts'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    loader: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            name: 'assets/[name].[ext]'
                        }
                    }
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html')
            })
        ]
    }

    return merge(base, isDev ? devConf : proConf)
}