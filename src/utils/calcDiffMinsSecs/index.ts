import { differenceInSeconds } from 'date-fns';

export const calcDiffMinsSecs = (
  targetTime: Date
): { minutes: number; seconds: number } => {
  const diffSeconds = differenceInSeconds(targetTime, new Date());

  const minutes = Math.max(Math.floor(diffSeconds / 60), 0);
  const seconds = Math.max(diffSeconds - minutes * 60, 0);

  return { minutes, seconds };
};

export default calcDiffMinsSecs;
