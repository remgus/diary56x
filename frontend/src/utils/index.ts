import stringUtils from "./strings";
import translation from "./translation";
import files from "./files";

export type SharedUtils = typeof sharedUtils;

const sharedUtils = {
  stringUtils,
  translation,
  files,
};
