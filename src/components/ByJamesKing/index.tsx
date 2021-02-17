import React from 'react';

import styles from './styles.scss';

export const ByJamesKing: React.FC = () => {
  return (
    <p className={styles.byJames}>
      By James King | <a href='https://www.ripixel.co.uk'>ripixel.co.uk</a>
    </p>
  );
};

export default ByJamesKing;
