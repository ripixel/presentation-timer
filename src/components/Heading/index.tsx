import React from 'react';

import styles from './styles.scss';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingLevel = `h${Level}`;

interface Props {
  level: Level;
  isTitle?: boolean;
  isBold?: boolean;
}

export const Heading: React.FC<Props> = ({
  children,
  level,
  isTitle,
  isBold,
}) => {
  const HeadingTag = `h${level}` as HeadingLevel;
  return (
    <HeadingTag
      style={{ fontWeight: isBold ? 700 : undefined }}
      className={isTitle ? styles.title : ''}
    >
      {children}
    </HeadingTag>
  );
};

export default Heading;
