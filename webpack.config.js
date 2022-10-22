const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');

module.exports = (env) => {
    const isDev = env.mode === 'development';
    const devConfig = {
        devServer: {
            open: true,
            port: 8080,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                    exclude: /node_modules/,
                },
            ]
        }
    };
    const prodConfig = {
        output: {
            filename: '[name].[contenthash].js',
            clean: true,
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                    exclude: /node_modules/,
                },
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]
    };
    return merge(isDev ? devConfig : prodConfig, {
        mode: env.mode,
        entry: './src/index.tsx',
        output: {
            path: __dirname + '/docs/',
        },
        module: {
            rules: [
                {
                    test: /\.png|.jpeg|.jpg|.gif|.webp$/,
                    type: 'asset/resource',
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    resolve: {
                        extensions: ['.ts', '.tsx'],
                    },
                    use: 'ts-loader',
                },
            ]
        },
        devtool: isDev ? 'source-map' : undefined,
        plugins: [
            new HtmlWebpackPlugin({
                template: 'index.html',
                title: 'Order System',
            }),
        ],
    })
}