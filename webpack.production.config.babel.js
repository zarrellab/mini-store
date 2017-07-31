import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { DefinePlugin, NoEmitOnErrorsPlugin } from 'webpack'
import CompressionPlugin from 'compression-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'


module.exports = {
  entry: [
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
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new NoEmitOnErrorsPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
    }),
  ],
  cache: false,
}
