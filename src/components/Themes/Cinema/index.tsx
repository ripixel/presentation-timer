import React from 'react';

import Timer from '../../Timer';

import { contain } from '../../../utils/intrinsicScale';

import background from '../../../../public/assets/cinema.png';

import { getDrawingInfo } from '../../../utils/getDrawingInfo';

const IMG_WIDTH = 1920,
  IMG_HEIGHT = 864,
  LEFT_OF_SCREEN = 531,
  TOP_OF_SCREEN = 78,
  TEXT_WIDTH = 580,
  CUSTOM_IMAGE_LEFT = 1143,
  CUSTOM_IMAGE_WIDTH = 220,
  SCREEN_HEIGHT = 350;

export const Cinema: React.FC = () => {
  const drawText = (
    ctx: CanvasRenderingContext2D,
    line1: string,
    line2: string,
    minutes: number,
    seconds: number
  ): void => {
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillStyle = '#333';
    ctx.font = '180px monospace';
    ctx.fillText(
      `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`,
      LEFT_OF_SCREEN,
      TOP_OF_SCREEN + 20,
      TEXT_WIDTH
    );

    ctx.font = '60px Montserrat';
    ctx.fillText(line1, LEFT_OF_SCREEN + 10, TOP_OF_SCREEN + 190, TEXT_WIDTH);

    ctx.font = '60px Montserrat';
    ctx.fillText(line2, LEFT_OF_SCREEN + 10, TOP_OF_SCREEN + 270, TEXT_WIDTH);
  };

  const draw = (setCanvasData: () => void) => {
    const { line1, line2, image, minutes, seconds, ctx } = getDrawingInfo();

    const logoImage = new Image();

    if (image) {
      logoImage.onload = () => {
        const { offsetX, offsetY, width, height } = contain(
          CUSTOM_IMAGE_WIDTH,
          SCREEN_HEIGHT,
          logoImage.width,
          logoImage.height
        );

        ctx.drawImage(
          logoImage,
          CUSTOM_IMAGE_LEFT + offsetX,
          TOP_OF_SCREEN + offsetY,
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
    ctx.fillStyle = '#fff';
    ctx.fillRect(LEFT_OF_SCREEN, TOP_OF_SCREEN, TEXT_WIDTH + 20, 354);

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
