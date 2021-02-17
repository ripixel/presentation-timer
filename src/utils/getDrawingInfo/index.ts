import calcDiffMinsSecs from '../calcDiffMinsSecs';

interface DrawingInfo {
  line1: string;
  line2: string;
  image?: string;
  targetTime: Date;
  minutes: number;
  seconds: number;
  ctx: CanvasRenderingContext2D;
}

export const getDrawingInfo = (): DrawingInfo => {
  if (!window.config || !window.canvas) {
    throw new Error('No window config or canvas defined');
  }

  const { line1, line2, targetTime, image } = window.config;
  const canvas = window.canvas;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('Error getting canvas 2d context');
  }

  const { minutes, seconds } = calcDiffMinsSecs(targetTime);

  return {
    line1,
    line2,
    targetTime,
    image,
    minutes,
    seconds,
    ctx,
  };
};
