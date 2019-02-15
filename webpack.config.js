const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  output: {
    filename: "el-tree-table.min.js",
    libraryTarget: "umd",
    umdNamedDefine: true,
    library: "ElTreeTable",
    libraryExport: "ElTreeTable"
  },
  externals: {
    externals: {
      vue: {
        commonjs: "vue",
        commonjs2: "vue",
        amd: "vue",
        root: "Vue"
      },
      "element-ui": {
        commonjs: "element-ui",
        commonjs2: "element-ui",
        amd: "element-ui",
        root: "ELEMENT"
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "media/[name].[hash:7].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
