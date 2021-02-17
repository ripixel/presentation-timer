import React from 'react';

import styles from './styles.scss';

interface Props {
  bold?: boolean;
}

export const P: React.FC<Props> = ({ children, bold }) => {
  return <p className={`${styles.p} ${bold ? styles.bold : ''}`}>{children}</p>;
};

export default P;
