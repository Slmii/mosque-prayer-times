import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const Markdown = ({ markdown }: { markdown: string }) => {
	return (
		<ReactMarkdown remarkPlugins={[remarkGfm]} linkTarget="_blank">
			{markdown}
		</ReactMarkdown>
	);
};
