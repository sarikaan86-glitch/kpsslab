import React, { useMemo } from 'react';
import katex from 'katex';

interface LatexRendererProps {
  content: string;
  className?: string;
  isBlock?: boolean;
}

/**
 * Parses a string containing LaTeX formulas delimited by $...$ or $$...$$
 * or raw LaTeX syntax, and renders it cleanly using KaTeX with fallbacks.
 */
export const LatexRenderer: React.FC<LatexRendererProps> = ({
  content,
  className = '',
  isBlock = false,
}) => {
  const renderedContent = useMemo(() => {
    if (!content) return '';

    // If whole content is wrapped in $$...$$ or is pure block math
    if (content.startsWith('$$') && content.endsWith('$$')) {
      const math = content.slice(2, -2).trim();
      try {
        return katex.renderToString(math, { displayMode: true, throwOnError: false });
      } catch {
        return content;
      }
    }

    // Check if text contains $...$ or $$...$$ formulas
    const hasDelimiters = /\$[^$]+\$/.test(content);

    if (hasDelimiters) {
      // Split by $...$ and render each math segment
      const parts = content.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);
      return parts
        .map((part) => {
          if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2).trim();
            try {
              return katex.renderToString(math, { displayMode: true, throwOnError: false });
            } catch {
              return part;
            }
          } else if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1).trim();
            try {
              return katex.renderToString(math, { displayMode: false, throwOnError: false });
            } catch {
              return part;
            }
          }
          // Regular text
          return part;
        })
        .join('');
    }

    // If no $ delimiters, check if text has obvious LaTeX syntax like \frac, \sqrt, \le, \ge, \cdot
    const hasRawLatex = /\\[a-zA-Z]+|\^\{|\_\{/.test(content);
    if (hasRawLatex && isBlock) {
      try {
        return katex.renderToString(content, { displayMode: isBlock, throwOnError: false });
      } catch {
        return content;
      }
    }

    return content;
  }, [content, isBlock]);

  // If content contains rendered HTML from KaTeX (contains katex span/div)
  const isHtml = renderedContent.includes('class="katex');

  if (isHtml) {
    return (
      <span
        className={`inline-block ${className}`}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />
    );
  }

  return <span className={className}>{content}</span>;
};
