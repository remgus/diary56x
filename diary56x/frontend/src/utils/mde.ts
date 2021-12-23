import { Options } from "easymde";

export const MDEOptions: Options = {
  autofocus: true,
  autosave: {
    enabled: true,
    uniqueId: "blog-create-easymde",
    delay: 1000,
    submit_delay: 5000,
  },
  renderingConfig: {
    singleLineBreaks: false,
    codeSyntaxHighlighting: true,
  },
  placeholder: "Даже Чехов боялся чистого листа. Просто начните писать.",
  tabSize: 4,
};
