const path = require("path");

const pairs = [
   {
    entry: "./src/Comment2.tsx",
    name: "Comment2",
  },
];

module.exports = pairs.map(({ entry, name }) => ({
  entry,
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist", "ui"),
    filename: name + ".js",
    library: {
      name: "__MacroNode__" + name,
      type: "window",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: [/node_modules/,/server/,]
      },
      // CSS Loader
      {
        test: /\.css$/,
        use: [
          "style-loader", // Injects styles into the DOM.
          "css-loader", // Interprets `@import` and `url()` like `import/require()`
        ],
      },
    ],
  },
  externals: {
    // Do not bundle React and ReactDOM, assume they're available externally
    react: "React",
    "react-dom": "ReactDOM",
    "@blueprintjs/core": "Blueprint",
    "@blueprintjs/select": "BlueprintSelect",
  },
}));
