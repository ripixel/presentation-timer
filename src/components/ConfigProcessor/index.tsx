import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { getConfig, getVolume } from '../../services/config';

import Button from '../Button';
import Centre from '../Centre';
import P from '../P';
import Macbook from '../Themes/Macbook';

export const ConfigProcessor: React.FC = () => {
  const initialConfig = getConfig();
  const player = useRef<ReactPlayer>(null);
  const [volume, setVolume] = useState(getVolume() || 0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      const volume = getVolume();

      if (volume === null) {
        return;
      }

      setVolume(volume);
    }, 1100);

    return () => {
      clearInterval(interval);
    };
  });

  if (!initialConfig) {
    return (
      <Centre>
        <P>
          Doesn&apos;t look like you&apos;ve set any config! Go back home and
          try again.
        </P>
        <Button linkTo='/'>Go back</Button>
      </Centre>
    );
  }

  // to prepare for multiple themes
  const theme = <Macbook />;

  return (
    <>
      {theme}
      <ReactPlayer
        ref={player}
        url={initialConfig.playlist}
        playing
        loop
        volume={volume / 10}
        width={250}
        height={250}
      />
    </>
  );
};

export default ConfigProcessor;
