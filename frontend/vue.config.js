// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.VUE_APP_VERSION = require("./package.json").version;

module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: false,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/api/private/*": {
        target: "http://localhost:8000/",
      },
    },
    writeToDisk: true,
    hot: true,
  },
};
