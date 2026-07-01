import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import fs from 'node:fs';
import path from 'node:path';

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
      } catch {
        /* rơi xuống mặc định */
      }
    }
    return md.utils.escapeHtml(code);
  },
});

const CONTENT_ROOT = path.join(process.cwd(), 'content');

// Đọc + render một file markdown thành HTML. `rel` tương đối so với content/.
export function renderMarkdownFile(rel: string): string {
  const full = path.join(CONTENT_ROOT, rel);
  const raw = fs.readFileSync(full, 'utf8');
  return md.render(raw);
}

// Lấy tiêu đề H1 đầu tiên (nếu cần đọc từ file thay vì structure).
export function firstHeading(rel: string): string {
  const full = path.join(CONTENT_ROOT, rel);
  const raw = fs.readFileSync(full, 'utf8');
  const m = raw.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : rel;
}
