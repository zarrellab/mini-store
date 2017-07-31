import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'


module.exports = {
  entry: [
    'webpack/hot/only-dev-server',
    './src/App.js',
  ],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      Images: path.resolve(__dirname, 'public/images/'),
    },
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'stage-2'] },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?',
      },
      {
        test: /\.(svg|jpe?g|png|gif)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'images/img-[hash:6].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              progressive: true,
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html',
      favicon: 'public/images/icons/favicon.ico',
    }),
    new HotModuleReplacementPlugin(),
  ],
}
