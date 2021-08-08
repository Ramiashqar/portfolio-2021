const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: true,
      minify: true,
      scriptLoading: "defer",
      favicon: "./src/assets/favi/logo.svg",
    }),
    new HtmlWebpackPlugin({
      template: "./src/thanks.html",
      filename: "thanks.html",
      inject: true,
      minify: true,
      scriptLoading: "defer",
      favicon: "./src/assets/favi/logo.svg",
    }),
  ],

  devtool: "source-map",
  watchOptions: {
    ignored: "/node_modules/",
  },
  stats: "errors-only",

  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "./.webpack_cache"), // You might need to rerun
  },

  devServer: {
    // bonjour: true,
    // historyApiFallback: true,
    // onListening: function (server) {
    //   const port = server.listeningApp.address().port
    //   console.log("App listening on port:", port)
    // },
    static: {
      directory: "./src",
      watch: true,
      publicPath: "/",
    },
    compress: true,
    port: 8080,
    host: "0.0.0.0",
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf)$/, type: "asset/resource" },
      // Videos of mp4 format
      { test: /\.mp4$/, type: "asset/resource" },
    ],
  },
}
