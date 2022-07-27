import { marked, Renderer } from "marked";
import DomPurify from "dompurify";
import hljs from "highlight.js";
import katex from "katex";

const renderer = new Renderer();

let originParagraph = renderer.paragraph.bind(renderer);

renderer.paragraph = (text) => {
  const blockRegex = /\$\$[^\$]+\$\$/g;
  const inlineRegex = /\$[^\$]+\$/g;
  let blockExprArray = text.match(blockRegex);
  let inlineExprArray = text.match(inlineRegex);
  if (blockExprArray) {
    for (let i in blockExprArray) {
      const expr = blockExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
  }

  if (inlineExprArray) {
    for (let i in inlineExprArray) {
      const expr = inlineExprArray[i];
      const result = renderMathsExpression(expr);
      text = text.replace(expr, result);
    }
  }

  return originParagraph(text);
};

function renderMathsExpression(expr: string) {
  console.log("RENDER MATH", expr);
  if (expr.startsWith("$") && expr.endsWith("$")) {
    let displayStyle = false;
    expr = expr.slice(1, expr.length - 1);
    if (expr.startsWith("$") && expr.endsWith("$")) {
      displayStyle = true;
      expr = expr.slice(1, expr.length - 1);
    }

    let html = "";
    try {
      html = katex.renderToString(expr);
    } catch (e) {
      console.error(e);
    }
    if (displayStyle && html) {
      html = html.replace(
        /class="katex"/g,
        'class="katex katex-block" style="display: block;"'
      );
    }
    return html;
  }
  return "";
}

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
  renderer: renderer,
};

export const getMarked = (content: string, inline = false): string => {
  let sanitizedContent = DomPurify.sanitize(content);
  sanitizedContent = new DOMParser().parseFromString(
    sanitizedContent,
    "text/html"
  ).documentElement.textContent as string;
  if (inline) return marked.parseInline(sanitizedContent, markedOptions);
  return marked(sanitizedContent, markedOptions);
};
