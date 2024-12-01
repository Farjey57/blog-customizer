import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [stylesArticle, setStylesArticle] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': stylesArticle.fontFamilyOption.value,
					'--font-size': stylesArticle.fontSizeOption.value,
					'--font-color': stylesArticle.fontColor.value,
					'--container-width': stylesArticle.contentWidth.value,
					'--bg-color': stylesArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				stylesArticle={stylesArticle}
				onSubmit={setStylesArticle}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
