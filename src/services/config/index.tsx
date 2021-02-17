export enum THEMES {
  MACBOOK = 'MACBOOK',
}

export interface Config {
  theme: THEMES;
  targetTime: Date;
  line1: string;
  line2: string;
  playlist?: string[];
  image?: string;
}

const LOCAL_STORAGE_CONFIG_KEY = 'PRESENTATION_TIMER_CONFIG';
const LOCAL_STORAGE_VOLUME_KEY = 'PRESENTATION_TIMER_VOLUME';

export const setConfig = (config: Config): void => {
  window.localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(config));
};

export const getConfig = (): Config | null => {
  const config = window.localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);

  if (!config) {
    return null;
  }

  const parsedConfig = JSON.parse(config) as Config;
  return {
    ...parsedConfig,
    targetTime: new Date(parsedConfig.targetTime),
  };
};

export const setVolume = (volume: number): void => {
  window.localStorage.setItem(LOCAL_STORAGE_VOLUME_KEY, volume.toString());
};

export const getVolume = (): number | null => {
  const volume = window.localStorage.getItem(LOCAL_STORAGE_VOLUME_KEY);

  if (!volume) {
    return null;
  }

  return parseInt(volume, 10);
};
