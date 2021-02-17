import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Button from '../../components/Button';
import ByJamesKing from '../../components/ByJamesKing';
import Centre from '../../components/Centre';
import ConfigForm from '../../components/ConfigForm';
import Heading from '../../components/Heading';
import P from '../../components/P';

import { getConfig, setConfig, setVolume, THEMES } from '../../services/config';

export const IndexPage: React.FC = () => {
  const history = useHistory();

  const initialConfig = getConfig();

  const [line1, setLine1] = useState(initialConfig?.line1 || '');
  const [line2, setLine2] = useState(initialConfig?.line2 || '');
  const [hours, setHours] = useState(initialConfig?.targetTime.getHours());
  const [minutes, setMinutes] = useState(
    initialConfig?.targetTime.getMinutes()
  );
  const [playlist, setPlaylist] = useState(initialConfig?.playlist);

  const isDisabled = !line1 || !line2 || hours === null || minutes === null;

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
    setVolume(5);

    history.push('/timer');
    window.open(
      `${window.location.origin}/update`,
      'UpdatePresentationTimer',
      'toolbar=0,location=0,menubar=0,height=595,width=365'
    );
  };

  return (
    <>
      <Helmet>
        <title>Presentation Timer | Create</title>
      </Helmet>
      <Centre>
        <Heading level={1} isTitle>
          Presentation Timer
        </Heading>
        <ByJamesKing />
        <P>
          When you launch your timer, it will open two tabs - one with the
          timer, and one so you can modify the configuration as it&apos;s
          displayed (so you don&apos;t have to mess with what&apos;s being
          presented on stream to change it).
        </P>

        <P bold>Target Time</P>
        <P>
          For ease of use, this app assumes the current day is the target. Enter
          your hours and minutes in 24-hour time below. For example, to set it
          to 2:45pm, you would enter 14 and 45.
        </P>

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
        />

        <Button disabled={isDisabled} onClick={onClick}>
          Show me my timer
        </Button>
      </Centre>
    </>
  );
};

export default IndexPage;
