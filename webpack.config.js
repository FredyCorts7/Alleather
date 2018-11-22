const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './src/app/main.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [ // use `include` vs `exclude` to white-list vs black-list
                    path.resolve(__dirname, "src"), // white-list your app source files
                ],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ],
            },
            {
                test: /\.useable\.css$/,
                use: [
                  { loader: "style-loader/useable" },
                  { loader: "css-loader" }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}