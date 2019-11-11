const path = require('path');
/**
 * Some options are put in comments as they're for frontend only version, for frontend-backend, we prefer write
 * a nodejs appli that permits also database and routing configurations
 */
const webpack = require('webpack'); // @frontend

const source = path.resolve(__dirname, 'src');
const public = path.resolve(__dirname, 'public');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pages = ['module']

const plugins = [
    new webpack.HotModuleReplacementPlugin(), //@frontend
    new HtmlWebpackPlugin({
        favicon: path.join(source, 'images', 'favicon.ico')
    }),
    new CleanWebpackPlugin(), ...pages.map(name => {
        return new HtmlWebpackPlugin({
            inject: true,
            chunks: ['index'],
            filename: path.join(public, name),
            template: path.join(source, name + '.html')
        })
    })
];

module.exports = {
    mode: 'development',
    entry: {
        'index': ['@babel/polyfill', './src/index.js']
    },
    output: {
        filename: '[name].js',
        path: public,
        //publicPath: '/demo/'
    },
    devServer: {
        contentBase: './public',
        hot: true,
        host: 'localhost',
        port: 5000,
        compress: true
    },
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ]
    }
};

