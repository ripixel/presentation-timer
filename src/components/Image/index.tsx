import React from 'react';

import styles from './styles.scss';

interface Props {
  src: string;
  alt?: string;
  square?: boolean;
  height?: string;
  width?: string;
}

export const Image: React.FC<Props> = ({
  src,
  alt,
  square,
  height = 'calc(100vw/3)',
  width = 'calc(100vw/3)',
}) => {
  return (
    <img
      style={{ height, width }}
      className={square ? styles.square : ''}
      src={src}
      alt={alt ?? 'Image'}
    />
  );
};

export default Image;
