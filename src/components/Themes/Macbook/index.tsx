import React from 'react';
import { useHistory } from 'react-router-dom';

import Timer from '../../Timer';

import calcDiffMinsSecs from '../../../utils/calcDiffMinsSecs';
import { contain } from '../../../utils/intrinsicScale';

import background from '../../../../public/assets/mac-fronton.jpg';

import { Config, getConfig } from '../../../services/config';

export const Macbook: React.FC = () => {
  const history = useHistory();

  const imgWidth = 2000;
  const imgHeight = 1333;
  const macLeftOfScreen = 717;
  const macTopOfScreen = 331;
  const macTextCentre = 1111;
  const macTextTop = 520;
  const maxTextWidth = 788;
  const mugLeft = 364;
  const mugTop = 674;
  const mugWidth = 150;
  const mugHeight = 160;

  const draw = (
    canvas: HTMLCanvasElement,
    setCanvasData: (data: string) => void
  ) => {
    const config = getConfig();

    if (!config) {
      history.push('/');
    }

    const { targetTime, line1, line2 } = config as Config;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    const { minutes, seconds } = calcDiffMinsSecs(targetTime);

    const logoImage = new Image();

    if (config?.image) {
      logoImage.onload = () => {
        const { offsetX, offsetY, width, height } = contain(
          mugWidth,
          mugHeight,
          logoImage.width,
          logoImage.height
        );

        console.log({ offsetX, offsetY, width, height });

        ctx.drawImage(logoImage, mugLeft, mugTop, width, height);

        setCanvasData(canvas.toDataURL());
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
        macTextCentre,
        macTextTop,
        maxTextWidth
      );

      ctx.font = '80px Montserrat';
      ctx.fillText(line1, macTextCentre, macTextTop + 150, maxTextWidth);

      ctx.font = '80px Montserrat';
      ctx.fillText(line2, macTextCentre, macTextTop + 250, maxTextWidth);

      if (config?.image) {
        logoImage.src = config.image;
      } else {
        setCanvasData(canvas.toDataURL());
      }
    };

    backgroundImage.src = background;
  };

  const updateDraw = (
    canvas: HTMLCanvasElement,
    setCanvasData: (data: string) => void
  ) => {
    const config = getConfig();

    if (!config) {
      history.push('/');
    }

    const { targetTime, line1, line2 } = config as Config;

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return;
    }

    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(macLeftOfScreen, macTopOfScreen, 788, 520);

    const { minutes, seconds } = calcDiffMinsSecs(targetTime);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.font = '200px monospace';
    ctx.fillText(
      `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`,
      macTextCentre,
      macTextTop,
      maxTextWidth
    );

    ctx.font = '80px Montserrat';
    ctx.fillText(line1, macTextCentre, macTextTop + 150, maxTextWidth);

    ctx.font = '80px Montserrat';
    ctx.fillText(line2, macTextCentre, macTextTop + 250, maxTextWidth);

    setCanvasData(canvas.toDataURL());
  };

  return (
    <Timer
      draw={draw}
      updateDraw={updateDraw}
      width={imgWidth}
      height={imgHeight}
    />
  );
};

export default Macbook;
