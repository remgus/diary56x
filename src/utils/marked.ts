import { marked } from "marked";
import * as DomPurify from "dompurify";
import hljs from "highlight.js";

const markedOptions: marked.MarkedOptions = {
  langPrefix: "hljs language-",
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, {
      language,
    }).value;
  },
  gfm: true,
  smartLists: true,
  smartypants: true,
};

export const getMarked = (content: string): string => {
  const sanitizedContent = DomPurify.sanitize(content);
  return marked(sanitizedContent, markedOptions);
};
