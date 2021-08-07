const path = require("path")
const glob = require("glob-all")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// const PurgeCSSPlugin = require("purgecss-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

const PATHS = {
  src: path.join(__dirname, "src"),
}

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "docs"),
    publicPath: "",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    //   // defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    //   whitelist: ["active", "u-hide-me", "scrollmagic-pin-spacer"],
    // }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
          noErrorOnMissing: false,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: true,
      minify: true,
      scriptLoading: "defer",
    }),
    new CompressionPlugin({
      filename: "[path][base].gz",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.3,
    }),
    new CompressionPlugin({
      filename: "[path][base].br",
      algorithm: "brotliCompress",
      test: /\.(js|css|html|svg)$/,
      minRatio: 0.3,
    }),
  ],

  performance: {
    hints: "error",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js" || ".html" || ".css" || ".ttf")
    },
  },

  optimization: {
    // splitChunks: { chunks: "all" },
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    minimize: true,
    removeAvailableModules: true,
    concatenateModules: true,
    innerGraph: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/i,
          filename: "extracted-comments.js",
          banner: (licenseFile) => {
            return `License information can be found in ${licenseFile}`
          },
        },
        exclude: "index.html",
        terserOptions: {
          compress: {},
          sourceMap: true,
        },
      }),
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },

  devtool: false,

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)[\\\/]core-js/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[name].[ext]",
            },
          },
        ],
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/fonts/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.mp4$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/videos/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
}
