import path from "path";
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const webpackConfig = (): Configuration => ({
  entry: "./src/index.tsx",
  ...(process.env.production || !process.env.development
    ? {}
    : { devtool: "eval-source-map" }),

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "build.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.(js|ts|tsx|jsx)$/,
        exclude: /node_modules/,
        loader: '@linaria/webpack-loader',
        options: {
          sourceMap: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // "style-loader",
          "css-loader"
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: "./public/index.html",
    }),
    // DefinePlugin allows you to create global constants which can be configured at compile time
    new DefinePlugin({
      "process.env": process.env.production || !process.env.development,
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
  ],
});

export default webpackConfig;

