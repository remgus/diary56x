import EasyMDE, { Options } from "easymde";
import hljs from "highlight.js";

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
    hljs,
  },
  toolbar: [
    "bold",
    "italic",
    "strikethrough",
    "|",
    "quote",
    "ordered-list",
    "unordered-list",
    "link",
    "image",
    {
      name: "table",
      className: "fa fa-table",
      action: EasyMDE.drawTable,
      title: "Table",
    },
    "|",
    "preview",
    "side-by-side",
    "fullscreen",
    "|",
    "undo",
    "redo",
  ],
};
