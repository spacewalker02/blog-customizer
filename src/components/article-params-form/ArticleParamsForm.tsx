import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { backgroundColors, contentWidthArr, fontColors, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { fontFamilyOptions } from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleSetting = {
	fontFamilyOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
	fontSizeOption: OptionType;
};

interface ArticleParamsFormProps {
	tempSettings: ArticleSetting;
	setTempSettings: React.Dispatch<React.SetStateAction<ArticleSetting>>;
	onApply: () => void;
	onReset: () => void;
	isOpen: boolean;
	onClose: () => void;
}

export const ArticleParamsForm = ({
	tempSettings,
	setTempSettings,
	onApply,
	onReset,
	isOpen,
	onClose,
}: ArticleParamsFormProps) => {
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClose} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}
				onSubmit={(e) => {
					e.preventDefault();
					onApply();
				}}
				onReset={(e) => {
					e.preventDefault();
					onReset();
				}}
				>
				<h2 className={styles.title_h2}>Задайте параметры</h2>
				<Select
  					title="шрифт"
  					selected={tempSettings.fontFamilyOption}
  					options={fontFamilyOptions}
  					onChange={(newOption) =>
    				setTempSettings({ ...tempSettings, fontFamilyOption: newOption })
  					}
				/>
				<RadioGroup
					title="размер шрифта"
					name="font-size"
					selected={tempSettings.fontSizeOption}
					options={fontSizeOptions}
					onChange={(newOption) => 
					setTempSettings({...tempSettings, fontSizeOption: newOption })
					}
				/>
				<Select
  					title="цвет шрифта"
  					selected={tempSettings.fontColor}
  					options={fontColors}
  					onChange={(newOption) =>
    				setTempSettings({ ...tempSettings, fontColor: newOption })
  					}
				/>
				<Separator
				/>
				<Select
  					title="цвет фона"
  					selected={tempSettings.backgroundColor}
  					options={backgroundColors}
  					onChange={(newOption) =>
    				setTempSettings({ ...tempSettings, backgroundColor: newOption })
  					}
				/>
				<Select
  					title="цвет контента"
  					selected={tempSettings.contentWidth}
  					options={contentWidthArr}
  					onChange={(newOption) =>
    				setTempSettings({ ...tempSettings, contentWidth: newOption })
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
