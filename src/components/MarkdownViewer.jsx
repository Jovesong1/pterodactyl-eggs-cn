import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

function MarkdownViewer({ markdownPath }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMarkdown() {
      try {
        setLoading(true);
        const response = await fetch(markdownPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
        setError(null);
      } catch (err) {
        console.error('Error fetching markdown:', err);
        setError('无法加载内容，请稍后再试');
      } finally {
        setLoading(false);
      }
    }

    fetchMarkdown();
  }, [markdownPath]);

  if (loading) {
    return <div className="flex justify-center py-10">正在加载内容...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="markdown-content prose max-w-none">
      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownViewer; 