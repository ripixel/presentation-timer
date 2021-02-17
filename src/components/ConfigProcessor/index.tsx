import React, { useEffect } from 'react';

import { getConfig, THEMES } from '../../services/config';

import Button from '../Button';
import Centre from '../Centre';
import P from '../P';
import Player from '../Player';

import Macbook from '../Themes/Macbook';
import Cinema from '../Themes/Cinema';

export const ConfigProcessor: React.FC = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      getConfig();
    }, 2100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const config = getConfig();

  if (!config) {
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

  let theme = <Macbook />;

  switch (config.theme) {
    case THEMES.MACBOOK:
      theme = <Macbook />;
      break;
    case THEMES.CINEMA:
      theme = <Cinema />;
      break;
    default:
    // do nothing, it's already set
  }

  return (
    <>
      {theme}
      <Player />
    </>
  );
};

export default ConfigProcessor;
