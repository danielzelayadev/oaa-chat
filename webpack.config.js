const debug = process.env.NODE_ENV !== "production"
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './app/index.html',
  inject: 'body'
})

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: [ 'babel-polyfill', "./app/index.js" ],
  output: { path: `${__dirname}/build`, filename: "bundle.js" },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      {
          test: /\.css$/,
          include: /app/,
          loaders: ['style', 'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss']
      },
      {
          test: /\.css$/,
          include: /node_modules/,
          loaders: ['style', 'css']
      },
      {
          test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
          exclude: /(node_modules|build)/,
          loader: 'url?limit=100000'
      }
    ]
  },
  plugins: [ htmlWebpackPlugin ]
}