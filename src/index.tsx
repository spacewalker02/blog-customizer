import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { ArrowButton } from './ui/arrow-button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);
	const [tempSettings, setTempSettings] = useState(defaultArticleState);
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm 
			    tempSettings={tempSettings}
				setTempSettings={setTempSettings}
				onApply={() => setAppliedSettings(tempSettings)}
				onReset={() => setTempSettings(appliedSettings)}
				isOpen={isSidebarOpen}
				onClose={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<ArrowButton isOpen={isSidebarOpen} onClick={() => setSidebarOpen(!isSidebarOpen)} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
