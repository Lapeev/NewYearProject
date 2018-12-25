const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const conf = {
    entry: "./src/index.js",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },

    module: {
        rules: [{
                test: /\.hbs$/,
                use: "handlebars-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        context: ''
                    }
                }]

            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: ExtractCssChunks.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin("dist", {}),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/index.html"
        }),
        new ExtractCssChunks({
            filename: "style.css",
            chunkFilename: "[id].css",
            hot: true,
            orderWarning: true,
            reloadAll: true,
            cssModules: false
        }),
        new CopyWebpackPlugin([{
            from: './src/img',
            to: './img'
          }]),
    ],

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8080,
        overlay: {
            warnings: false,
            errors: true
        },
        disableHostCheck: true
    }
}

module.exports = (env, options) => {
    const production = options.mode === "production";
    conf.devtool = production ?
        "source-map" :
        "eval-sourcemap";
    return conf;
};