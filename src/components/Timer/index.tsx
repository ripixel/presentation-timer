import React, { useState, useEffect } from 'react';

import styles from './styles.scss';

interface Props {
  draw: (setCanvasData: () => void) => void;
  updateDraw: (setCanvasData: () => void) => void;
  width: number;
  height: number;
}

declare global {
  interface Window {
    canvas?: HTMLCanvasElement;
  }
}

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
  if (!window.canvas) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    window.canvas = canvas;
  }

  return window.canvas;
};

export const Timer: React.FC<Props> = ({ draw, updateDraw, width, height }) => {
  const [canvasData, setCanvasData] = useState<string>('');

  const setCanvasDataFromWindow = () => {
    if (!window.canvas) {
      throw new Error('No canvas on window');
    }
    setCanvasData(window.canvas.toDataURL());
  };

  useEffect(() => {
    createCanvas(width, height);

    draw(setCanvasDataFromWindow);

    const interval = setInterval(() => {
      updateDraw(setCanvasDataFromWindow);
    }, 1000);

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
