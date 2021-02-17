import React from 'react';

import styles from './styles.scss';

interface Props {
  name?: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Select: React.FC<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    props.onChange(event.target.value);
  };

  return (
    <select
      className={styles.selectInput}
      name={props.name}
      value={props.value}
      onChange={onChange}
      placeholder={props.placeholder}
      disabled={props.disabled}
    >
      {props.options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
