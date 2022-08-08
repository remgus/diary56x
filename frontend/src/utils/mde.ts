import { Options } from "easymde";

export const BlogMDEOptions: Options = {
  autofocus: true,
  autosave: {
    enabled: true,
    uniqueId: "blog-create-easymde",
    delay: 1000,
  },
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
  placeholder: "Даже Чехов боялся чистого листа. Просто начните писать.",
  tabSize: 4,
  spellChecker: false,
};

export const homeworkMDEOptions: Options = {
  autofocus: false,
  tabSize: 4,
  spellChecker: false,
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
};
