var debug = process.env.NODE_ENV !== "production";
var webpack = require("webpack");
var path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./assets/js/client.js",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015", "stage-0"],
          plugins: ["react-html-attrs", "transform-decorators-legacy", "transform-class-properties"]
        }
      },
      {
        test: /\.s?css$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "./assets/js/client.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    }),
    new webpack.ProvidePlugin({
        TM: "gsap",
        TweenMax: "gsap",
        "window.TM": "gsap"
    }),
    new webpack.ProvidePlugin({
        swiper: "swiper",
        "window.Swiper": "swiper"
    })
  ],
};
