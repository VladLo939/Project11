const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';


module.exports = {
    entry: './src/script.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[chunkhash].js'
    },

    module: {
        rules: [
          { 
            test: /\.js$/, 
            use: { loader: 'babel-loader' }, 
            exclude: /node_modules/ 
          },
          {
            test: /\.css$/,
            use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
          },
          
          {
            test: /\.(woff|woff2|ttf)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]'
                },
            }
          },

          {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            use: {
                loader: 'file-loader',
            options: {
            name: './images/[name].[ext]',
            esModule: false 
            }
          }
        },
        {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
              }
            }
        }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),

        new WebpackMd5Hash(),

        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
    }),

    new webpack.DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

      ]
}