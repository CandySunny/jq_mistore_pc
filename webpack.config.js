const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    mode: 'development',//production
    entry: {
        index: path.resolve(__dirname, './src/js/Index.js'),
        list: path.resolve(__dirname, './src/js/List.js'),
        detail: path.resolve(__dirname, './src/js/Detail.js')
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            {
                test:/\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    // 单独提取css文件
                    // {
                    //     loader: miniCssExtractPlugin.loader,
                    //     options: {
                    //         hmr: process.env.NODE_ENV === 'development'
                    //     }
                    // },
                    'style-loader',//负责把css放到html当中
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                loader: [
                    'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]',
                    'image-webpack-loader'
                ]
            }
        ]
    },

    plugins: [
        new uglify(),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,//删除所有注释
                collapseWhitespace: true//删除所有空格换行
            },
            filename: 'index.html',//打包后的文件名称
            template: path.resolve(__dirname, 'src/index.html'),//模板文件
            title: 'mistore',
            chunksSortMode: 'manual',
            chunks: ['index'],
            excludeChunks: ['node-modules'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,//删除所有注释
                collapseWhitespace: true//删除所有空格换行
            },
            filename: 'list.html',//打包后的文件名称
            template: path.resolve(__dirname, 'src/list.html'),//模板文件
            title: 'mistore',
            chunksSortMode: 'manual',
            chunks: ['list'],
            excludeChunks: ['node-modules'],
            hash: true
        }),
        new htmlWebpackPlugin({
            minify: {
                removeComments: true,//删除所有注释
                collapseWhitespace: true//删除所有空格换行
            },
            filename: 'detail.html',//打包后的文件名称
            template: path.resolve(__dirname, 'src/detail.html'),//模板文件
            title: 'mistore',
            chunksSortMode: 'manual',
            chunks: ['detail'],
            excludeChunks: ['node-modules'],
            hash: true
        })               

        // 单独提取css文件，指定提取的css文件存放路径
        // new miniCssExtractPlugin({
        //     filename: 'css/[name].css'
        // })
    ],

    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        open: true,
        host: 'localhost',
        port: 3200
    }  
}

module.exports = config;