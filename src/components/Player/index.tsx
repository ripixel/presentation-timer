import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

import { getConfig, getVolume } from '../../services/config';

import styles from './styles.scss';

export const Player: React.FC = () => {
  const { playlist } = getConfig() || {};
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

  if (!playlist || playlist.length === 0) {
    return null;
  }

  return (
    <div className={styles.player}>
      <ReactPlayer
        url={playlist.filter((item) => item !== '')}
        playing
        loop
        volume={volume / 10}
        width={250}
        height={250}
      />
    </div>
  );
};

export default Player;
