import { marked } from "marked";
import DomPurify from "dompurify";
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

export const getMarked = (content: string, inline = false): string => {
  const sanitizedContent = DomPurify.sanitize(content);
  if (inline) return marked.parseInline(sanitizedContent, markedOptions);
  return marked(sanitizedContent, markedOptions);
};
