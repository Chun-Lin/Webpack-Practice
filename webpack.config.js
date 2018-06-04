const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  // sourceMap
  devtool: 'cheap-module-eval-source-map',
  // entry file
  entry: './src/index.js',
  // output file's configuration
  output: {
    // Local disk directory to store all your output files (Absolute path)
    path: path.resolve(__dirname, 'dist'),
    // output file name
    filename: 'bundle.js',
    chunkFilename: '[id].js',
    // Where you uploaded your bundled files. (Relative to server root)
    publicPath: '',
  },
  // These options change how modules are resolved
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // These options determine how the different types of modules within a project will be treated
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]',
      },
    ],
  },
}
