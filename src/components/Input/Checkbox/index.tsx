import React from 'react';

interface Props {
  name?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

export const CheckboxInput: React.FC<Props> = (props) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!props.disabled) {
      props.onChange(event.target.checked);
    }
  };

  return (
    <input
      aria-label={props.name}
      name={props.name}
      type='checkbox'
      checked={props.checked}
      onChange={onChange}
      disabled={props.disabled}
    />
  );
};

export default CheckboxInput;
