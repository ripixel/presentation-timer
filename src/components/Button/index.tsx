import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: 'primary' | 'secondary' | 'tertiary';
  linkTo?: string;
}

const defaultProps = {
  type: 'button' as 'button' | 'submit' | 'reset',
  style: 'primary' as 'primary' | 'secondary' | 'tertiary',
};

export const Button: React.FC<Props> = (props) => {
  const button = (
    <button
      className={
        styles.button +
        (props.style ? ` ${styles[props.style]}` : '') +
        (props.disabled ? ` ${styles.disabled}` : '')
      }
      onClick={() => {
        if (!props.disabled && props.onClick) {
          props.onClick();
        }
      }}
      disabled={props.disabled}
      type={props.type}
    >
      {props.children}
    </button>
  );
  return props.linkTo ? <Link to={props.linkTo}>{button}</Link> : button;
};

Button.defaultProps = defaultProps;

export default Button;
