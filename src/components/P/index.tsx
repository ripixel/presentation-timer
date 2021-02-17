import React from 'react';

import styles from './styles.scss';

interface Props {
  bold?: boolean;
  title?: boolean;
  label?: boolean;
}

export const P: React.FC<Props> = ({ children, bold, title, label }) => {
  return (
    <p
      className={`${styles.p} ${bold ? styles.bold : ''} ${
        title ? styles.title : ''
      } } ${label ? styles.label : ''}`}
    >
      {children}
    </p>
  );
};

export default P;
