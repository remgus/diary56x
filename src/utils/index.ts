import { App, Plugin } from "vue";
import dateUtils from "./date";
import stringUtils from "./strings";
import translation from "./translation";
import files from "./files";

export type SharedUtils = typeof sharedUtils;

const sharedUtils = {
  stringUtils,
  dateUtils,
  translation,
  files,
};

const UtilsPlugin: Plugin = {
  install(app: App): void {
    app.config.globalProperties.$utils = sharedUtils;
  },
};

export default UtilsPlugin;
