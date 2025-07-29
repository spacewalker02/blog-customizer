import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { backgroundColors, contentWidthArr, fontColors, fontSizeOptions, OptionType, fontFamilyOptions, defaultArticleState } from 'src/constants/articleProps';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';
import { useEffect, useState, useRef } from 'react';

type ArticleSetting = typeof defaultArticleState;

interface ArticleParamsFormProps {
	appliedSettings: ArticleSetting;
	onApply: (newSettings: ArticleSetting) => void;
	onReset: () => void;
	isOpen: boolean;
	onClose: () => void;
}

export const ArticleParamsForm = ({
	appliedSettings,
	onApply,
	onReset,
	isOpen,
	onClose,
}: ArticleParamsFormProps) => {
	const [formSettings, setFormSettings] = useState<ArticleSetting>(appliedSettings);
	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen) {
			setFormSettings(appliedSettings);
		}
	}, [isOpen, appliedSettings]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (
				asideRef.current && !asideRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);


	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClose} />
			<aside
			ref={asideRef}
			className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					onApply(formSettings);
				}}
				onReset={(e) => {
					e.preventDefault();
					onReset();
					setFormSettings(defaultArticleState);
				}}
				>
				<h2 className={styles.title_h2}>Задайте параметры</h2>
				<Select
  					title="шрифт"
  					selected={formSettings.fontFamilyOption}
  					options={fontFamilyOptions}
  					onChange={(newOption) =>
    				setFormSettings({ ...formSettings, fontFamilyOption: newOption })
  					}
				/>
				<RadioGroup
					title="размер шрифта"
					name="font-size"
					selected={formSettings.fontSizeOption}
					options={fontSizeOptions}
					onChange={(newOption) => 
					setFormSettings({...formSettings, fontSizeOption: newOption })
					}
				/>
				<Select
  					title="цвет шрифта"
  					selected={formSettings.fontColor}
  					options={fontColors}
  					onChange={(newOption) =>
					setFormSettings({ ...formSettings, fontColor: newOption })
  					}
				/>
				<Separator
				/>
				<Select
  					title="цвет фона"
  					selected={formSettings.backgroundColor}
  					options={backgroundColors}
  					onChange={(newOption) =>
					setFormSettings({ ...formSettings, backgroundColor: newOption })
  					}
				/>
				<Select
  					title="цвет контента"
  					selected={formSettings.contentWidth}
  					options={contentWidthArr}
  					onChange={(newOption) =>
					setFormSettings({ ...formSettings, contentWidth: newOption })
  					}
				/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
