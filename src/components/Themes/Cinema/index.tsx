import React from 'react';

import Timer from '../../Timer';

import { contain } from '../../../utils/intrinsicScale';

import background from '../../../../public/assets/cinema.png';

import { getDrawingInfo } from '../../../utils/getDrawingInfo';

const IMG_WIDTH = 1920,
  IMG_HEIGHT = 864,
  TOP_OF_SCREEN = 78,
  TIMER_RIGHT = 1300,
  TEXT_WIDTH = 580,
  CUSTOM_IMAGE_TOP = 153,
  CUSTOM_IMAGE_LEFT = 650,
  CUSTOM_IMAGE_WIDTH = 200,
  CUSTOM_IMAGE_HEIGHT = 200,
  LINES_LEFT = 870,
  LINES_WIDTH = 430,
  LINE_ONE_TOP = 190,
  LINE_TWO_TOP = 270;

export const Cinema: React.FC = () => {
  const drawText = (
    ctx: CanvasRenderingContext2D,
    line1: string,
    line2: string,
    minutes: number,
    seconds: number
  ): void => {
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#fff';
    ctx.font = '40px monospace';
    ctx.fillText(
      `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`,
      TIMER_RIGHT,
      TOP_OF_SCREEN + 20,
      TEXT_WIDTH
    );

    ctx.textAlign = 'left';
    ctx.font = '40px Montserrat';
    ctx.fillText(line1.toUpperCase(), LINES_LEFT, LINE_ONE_TOP, LINES_WIDTH);

    ctx.font = '18px Montserrat';
    ctx.fillText(line2, LINES_LEFT, LINE_TWO_TOP, LINES_WIDTH);
  };

  const draw = (setCanvasData: () => void) => {
    const { line1, line2, image, minutes, seconds, ctx } = getDrawingInfo();

    const logoImage = new Image();

    if (image) {
      logoImage.onload = () => {
        const { offsetX, offsetY, width, height } = contain(
          CUSTOM_IMAGE_WIDTH,
          CUSTOM_IMAGE_HEIGHT,
          logoImage.width,
          logoImage.height
        );

        ctx.drawImage(
          logoImage,
          CUSTOM_IMAGE_LEFT + offsetX,
          CUSTOM_IMAGE_TOP + offsetY,
          width,
          height
        );

        drawText(ctx, line1, line2, minutes, seconds);

        setCanvasData();
      };
    }

    const backgroundImage = new Image();

    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0);

      if (image) {
        logoImage.src = image;
      } else {
        setCanvasData();
      }
    };

    backgroundImage.src = background;
  };

  const updateDraw = (setCanvasData: () => void) => {
    const { line1, line2, minutes, seconds, ctx } = getDrawingInfo();

    ctx.beginPath();
    ctx.fillStyle = '#111';
    ctx.fillRect(LINES_LEFT, TOP_OF_SCREEN, LINES_WIDTH, 160);
    ctx.fillRect(LINES_LEFT, TOP_OF_SCREEN + 180, LINES_WIDTH, 100);

    drawText(ctx, line1, line2, minutes, seconds);

    setCanvasData();
  };

  return (
    <Timer
      draw={draw}
      updateDraw={updateDraw}
      width={IMG_WIDTH}
      height={IMG_HEIGHT}
    />
  );
};

export default Cinema;
