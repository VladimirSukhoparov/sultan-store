const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV;


module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
        publicPath: '/'
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
        new MiniCssExtractPlugin({
            filename: './styles/main.css'
        }),
        new CleanWebpackPlugin()

    ],
    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
                type: 'asset/inline'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader'
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
}