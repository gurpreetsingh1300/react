var path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '/src/main.js')
  },
  devServer: {
    port: 4400
  },
  mode: "development",
  target: 'web',
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'browser.js'
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /nodeModulesPath/
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-loader'
      },
      {
        test: /\.(ttf|woff2|eot|woff|png|jpg|gif)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /nodeModulesPath/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
