const path = require('path');
const WorkerPlugin = require('worker-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    globalObject: 'self',
    path: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new WorkerPlugin(),
    new WasmPackPlugin({ crateDirectory: './src/crate' }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(['./dist', './src/crate/pkg']),
  ],
};
