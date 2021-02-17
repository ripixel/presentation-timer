import React from 'react';

import styles from './styles.scss';

interface Props {
  name?: string;
  value?: number;
  onChange: (value: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const NumberInput: React.FC<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(parseInt(event.target.value, 10));
  };

  return (
    <input
      className={styles.numberInput}
      name={props.name}
      type='number'
      value={props.value?.toString()}
      onChange={onChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
    />
  );
};

export default NumberInput;
