const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'lcu-orchestrator',
      library: { type: 'var', name: 'lcu-orchestrator' },
      filename: 'remoteEntry.js',
      // runtime: string | false,
      remotes: [],
      exposes: [],
      shared: []
    }),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
    }),
  ],
  output: {
    filename: '[name].lcu.[contenthash].js',
    path: path.resolve(__dirname, 'lcu'),
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './lcu',
  },
  optimization: {
    moduleIds: 'deterministic',
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
};
