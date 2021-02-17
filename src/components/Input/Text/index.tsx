import React from 'react';

import styles from './styles.scss';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isPassword?: boolean;
}

export const TextInput: React.FC<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onChange(event.target.value);
  };

  return (
    <input
      className={styles.textInput}
      type={props.isPassword ? 'password' : 'text'}
      value={props.value}
      onChange={onChange}
      placeholder={props.placeholder}
    />
  );
};

export default TextInput;
