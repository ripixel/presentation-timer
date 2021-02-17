import React, { useState } from 'react';

import Button from '../../components/Button';
import Centre from '../../components/Centre';
import ConfigForm from '../../components/ConfigForm';
import Heading from '../../components/Heading';

import { getConfig, setConfig, THEMES } from '../../services/config';

export const UpdatePage: React.FC = () => {
  const initialConfig = getConfig();

  const [line1, setLine1] = useState(initialConfig?.line1 || '');
  const [line2, setLine2] = useState(initialConfig?.line2 || '');
  const [hours, setHours] = useState(initialConfig?.targetTime.getHours());
  const [minutes, setMinutes] = useState(
    initialConfig?.targetTime.getMinutes()
  );
  const [playlist, setPlaylist] = useState(initialConfig?.playlist);

  const onClick = () => {
    const targetTime = new Date();
    targetTime.setHours(hours as number);
    targetTime.setMinutes(minutes as number);

    setConfig({
      targetTime,
      line1,
      line2,
      playlist,
      theme: THEMES.MACBOOK,
    });
  };

  return (
    <Centre>
      <Heading level={3}>Presentation Timer Control</Heading>

      <ConfigForm
        line1={line1}
        setLine1={setLine1}
        line2={line2}
        setLine2={setLine2}
        hours={hours}
        setHours={setHours}
        minutes={minutes}
        setMinutes={setMinutes}
        playlist={playlist}
        setPlaylist={setPlaylist}
        isUpdateForm
      />

      <Button onClick={onClick}>Update Timer</Button>
    </Centre>
  );
};

export default UpdatePage;
