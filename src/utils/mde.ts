import { Options } from "easymde";

export const BlogMDEOptions: Options = {
  autofocus: true,
  autosave: {
    enabled: true,
    uniqueId: "blog-create-easymde",
  },
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
  placeholder: "Даже Чехов боялся чистого листа. Просто начните писать.",
  tabSize: 4,
};
