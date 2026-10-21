import {
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
  contentWidthArr,
  defaultArticleState,
  type ArticleStateType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { clsx } from 'clsx';
import { useState, useRef, useEffect, type FormEvent } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';

type TProps = {
  onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: TProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);

  const formRef = useRef<HTMLElement>(null);
  const arrowWrapperRef = useRef<HTMLDivElement>(null);

  const resetForm = (): void => {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onApply(formState);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent): void => {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        !arrowWrapperRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return (): void => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div ref={arrowWrapperRef}>
        <ArrowButton isOpen={isOpen} onClick={(): void => setIsOpen(!isOpen)} />
      </div>

      <aside
        ref={formRef}
        className={clsx(styles.container, { [styles.container_open]: isOpen })}
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            <Select
              title="Шрифт"
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={(option): void => {
                setFormState({ ...formState, fontFamilyOption: option });
              }}
            />

            <RadioGroup
              name="font-size"
              title="Размер шрифта"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(option): void => {
                setFormState({ ...formState, fontSizeOption: option });
              }}
            />

            <Select
              title="Цвет шрифта"
              options={fontColors}
              selected={formState.fontColor}
              onChange={(option): void => {
                setFormState({ ...formState, fontColor: option });
              }}
            />

            <Separator />

            <Select
              title="Цвет фона"
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={(option): void => {
                setFormState({ ...formState, backgroundColor: option });
              }}
            />

            <Select
              title="Ширина контента"
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(option): void => {
                setFormState({ ...formState, contentWidth: option });
              }}
            />
          </div>

          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" onClick={resetForm} />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
