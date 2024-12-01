import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	stylesArticle: ArticleStateType;
	onSubmit: (formState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	stylesArticle,
	onSubmit,
}: ArticleParamsFormProps) => {
	//Стейт формы
	const [state, setState] = useState(stylesArticle);

	const handleOptionChange = (name: string) => (option: OptionType) => {
		setState({ ...state, [name]: option });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit(state);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		onSubmit(defaultArticleState);
	};

	//Работа с открытием/закрытием формы
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement | null>(null);

	const handleArrowClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: asideRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleOptionChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontSize'
						title='размер шрифта'
						selected={state.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleOptionChange('fontSizeOption')}
					/>
					<Select
						title='цвет шрифта'
						selected={state.fontColor}
						options={fontColors}
						onChange={handleOptionChange('fontColor')}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={state.backgroundColor}
						options={backgroundColors}
						onChange={handleOptionChange('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						selected={state.contentWidth}
						options={contentWidthArr}
						onChange={handleOptionChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
