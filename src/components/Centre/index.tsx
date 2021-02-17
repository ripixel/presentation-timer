import React from 'react';

import styles from './styles.scss';

export const Centre: React.FC = ({ children }) => (
  <div className={styles.centre}>{children}</div>
);

export default Centre;
