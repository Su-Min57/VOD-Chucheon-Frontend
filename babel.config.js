module.exports = {
    presets: [
      ["@babel/preset-react", {
        runtime: "automatic"
      }]
    ],
    plugins: [
      "@babel/plugin-proposal-private-methods",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-numeric-separator",
      "@babel/plugin-proposal-class-properties"
    ]
  };
  