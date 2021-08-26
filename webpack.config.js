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
