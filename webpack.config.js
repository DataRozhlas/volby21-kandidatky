// const path = require("path");

// module.exports = {
//   entry: "./js/script.js",
//   output: {
//     path: path.resolve(__dirname),
//     filename: "output.js",
//   },
//   resolve: {
//     alias: {
//       react: "preact/compat",
//       "react-dom/test-utils": "preact/test-utils",
//       "react-dom": "preact/compat",
//       // Must be below test-utils
//     },
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options: {
//             presets: [
//               "@babel/preset-env",
//               ["@babel/preset-react", { pragma: "h", pragmaFrag: "Fragment" }],
//             ],
//             plugins: ["@babel/plugin-transform-runtime"],
//           },
//         },
//       },
//     ],
//   },
// };

const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      url: require.resolve("url/"),
      util: require.resolve("util/"),
      buffer: require.resolve("buffer/"),
      vm: require.resolve("vm-browserify"),
      os: require.resolve("os-browserify/browser"),
      constants: require.resolve("constants-browserify"),
      assert: require.resolve("assert/"),
      fs: require.resolve("fs/"),
      path: require.resolve("path/"),
    },
  },
  entry: "./js/script.js",
  output: {
    path: path.resolve(__dirname),
    filename: "output.js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
