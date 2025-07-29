import styles from '../styles/index.module.scss';
import { Article } from './article';
import { ArticleParamsForm } from './article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import { CSSProperties, useState } from 'react';


export const App = () => {
	const [appliedSettings, setAppliedSettings] = useState(defaultArticleState);
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<main
			className={styles.main}
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
                appliedSettings={appliedSettings}
                onApply={setAppliedSettings}
                onReset={() => setAppliedSettings(defaultArticleState)}
				isOpen={isSidebarOpen}
				onClose={() => setSidebarOpen(!isSidebarOpen)}
			/>
			<Article />
		</main>
	);
};