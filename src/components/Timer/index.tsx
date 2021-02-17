import React, { useState, useEffect } from 'react';

import styles from './styles.scss';

interface Props {
  draw: (
    canvas: HTMLCanvasElement,
    setCanvasData: (data: string) => void
  ) => void;
  updateDraw: (
    canvas: HTMLCanvasElement,
    setCanvasData: (data: string) => void
  ) => void;
  width: number;
  height: number;
}

declare global {
  interface Window {
    canvas?: HTMLCanvasElement;
  }
}

export const Timer: React.FC<Props> = ({ draw, updateDraw, width, height }) => {
  const canvas = window.canvas ?? document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const [canvasData, setCanvasData] = useState<string>('');

  useEffect(() => {
    draw(canvas, setCanvasData);

    const interval = setInterval(() => updateDraw(canvas, setCanvasData), 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles.timer}
      style={{ backgroundImage: `url(${canvasData})` }}
    />
  );
};

export default Timer;
