postcss = {
  test: /\.(pcss)$/,
  use: [
    { loader: "style-loader", options: { sourceMap: true } },
    { loader: "css-loader", options: { sourceMap: true } },
    {
      loader: "postcss-loader",
      options: {
        config: {
          path: "../postcss.config.js"
        },
        sourceMap: true,
        plugins: function() {
          return [
            require("precss"),
            require("postcss-nested")(),
            require("autoprefixer")()
          ];
        }
      }
    }
  ]
};
