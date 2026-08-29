import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Rendu markdown du contenu projet (tables GFM incluses). */
export function Markdown({ content }: { content: string }): JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer nofollow">
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
