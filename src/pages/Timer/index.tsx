import React from 'react';
import { Helmet } from 'react-helmet';

import ConfigProcessor from '../../components/ConfigProcessor';

export const TimerPage: React.FC = () => (
  <>
    <Helmet>
      <title>Presentation Timer | Timer</title>
    </Helmet>
    <ConfigProcessor />
  </>
);

export default TimerPage;
