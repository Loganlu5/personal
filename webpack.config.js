/**
 * Created by Yanzhi on 2018/4/16.
 */
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const mockServer = require('./mock/server')
module.exports = {
    // 让 webpack 知道以哪个模块为入口，做依赖收集
    // 具体参考 https://webpack.js.org/concepts/#entry
    entry: {
        index: './src/pages/index.js',
        about: './src/pages/about.js'
    },
    output: {
        //path: path.join(__dirname, '/dist'),
        filename: '[name].js'
    },
    module: {
        // 使用 babel-loader 编译 es6/7/8 和 jsx 语法
        // 注意：这里没有配置 preset，而是在 .babelrc 文件里面配置
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    // configuring the apis(fake datas only for debugging)
    devServer:{
        after:(app) => {
            mockServer(app)
        }
    },
    plugins: [
        // 这里我们通常想要指定自己的 html 文件模板，也可以指定生成的 html 的文件名
        // 如果不传参数，会有一个默认的模板文件
        // 具体参考 https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: './src/pages/index.html',
            chunks:['commons','index']
        }),
        new HtmlWebpackPlugin({
            template: './src/pages/about.html',
            filename:'about.html',
            chunks:['commons','about']
        })
    ],

    optimization:{
        splitChunks:{
            cacheGroups:{
                // 创建一个 commons 块，用于包含所有入口模块共用的代码
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    }
}