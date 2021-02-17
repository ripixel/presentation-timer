import React from 'react';

import Timer from '../../Timer';

import { contain } from '../../../utils/intrinsicScale';

import background from '../../../../public/assets/mac-fronton.jpg';
import { getDrawingInfo } from '../../../utils/getDrawingInfo';

const IMG_WIDTH = 2000,
  IMG_HEIGHT = 1333,
  MAC_LEFT_OF_SCREEN = 717,
  MAC_TOP_OF_SCREEN = 331,
  MAC_TEXT_CENTRE = 1111,
  MAC_TEXT_TOP = 520,
  MAC_TEXT_WIDTH = 788,
  MUG_LEFT = 364,
  MUG_TOP = 674,
  MUG_WIDTH = 150,
  MUG_HEIGHT = 160;

export const Macbook: React.FC = () => {
  const draw = (setCanvasData: () => void) => {
    const { line1, line2, image, minutes, seconds, ctx } = getDrawingInfo();

    const logoImage = new Image();

    if (image) {
      logoImage.onload = () => {
        const { offsetX, offsetY, width, height } = contain(
          MUG_WIDTH,
          MUG_HEIGHT,
          logoImage.width,
          logoImage.height
        );

        ctx.drawImage(
          logoImage,
          MUG_LEFT + offsetX,
          MUG_TOP + offsetY,
          width,
          height
        );

        setCanvasData();
      };
    }

    const backgroundImage = new Image();

    backgroundImage.onload = () => {
      ctx.drawImage(backgroundImage, 0, 0);

      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.font = '200px monospace';
      ctx.fillText(
        `${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`,
        MAC_TEXT_CENTRE,
        MAC_TEXT_TOP,
        MAC_TEXT_WIDTH
      );

      ctx.font = '80px Montserrat';
      ctx.fillText(line1, MAC_TEXT_CENTRE, MAC_TEXT_TOP + 150, MAC_TEXT_WIDTH);

      ctx.font = '80px Montserrat';
      ctx.fillText(line2, MAC_TEXT_CENTRE, MAC_TEXT_TOP + 250, MAC_TEXT_WIDTH);

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
    ctx.fillStyle = '#000';
    ctx.fillRect(MAC_LEFT_OF_SCREEN, MAC_TOP_OF_SCREEN, 788, 520);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '200px monospace';
    ctx.fillText(
      `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`,
      MAC_TEXT_CENTRE,
      MAC_TEXT_TOP,
      MAC_TEXT_WIDTH
    );

    ctx.font = '80px Montserrat';
    ctx.fillText(line1, MAC_TEXT_CENTRE, MAC_TEXT_TOP + 150, MAC_TEXT_WIDTH);

    ctx.font = '80px Montserrat';
    ctx.fillText(line2, MAC_TEXT_CENTRE, MAC_TEXT_TOP + 250, MAC_TEXT_WIDTH);

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

export default Macbook;
