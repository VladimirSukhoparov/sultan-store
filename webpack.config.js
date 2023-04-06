const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV;


module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].js',
    },
    devServer: {
        historyApiFallback: true,
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()

    ],
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(ico|jpg|jpeg|png|svg)$/,
                use: ['file-loader'],


            },
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader'],

            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    stats: {
        errorDetails: true
    },
}