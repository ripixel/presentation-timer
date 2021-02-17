import React, { useEffect } from 'react';

import { getConfig } from '../../services/config';

import Button from '../Button';
import Centre from '../Centre';
import P from '../P';
import Player from '../Player';
import Macbook from '../Themes/Macbook';

export const ConfigProcessor: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      getConfig();
    }, 2100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!window.config) {
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
      <Player />
    </>
  );
};

export default ConfigProcessor;
