import React, { useState } from 'react';

import TextInput from '../../components/Input/Text';
import P from '../../components/P';
import Button from '../Button';
import NumberInput from '../Input/Number';

import { getVolume, setVolume } from '../../services/config';

import styles from './styles.scss';
import FileInput from '../Input/FileInput';

interface Props {
  line1: string;
  line2: string;
  hours?: number;
  minutes?: number;
  playlist?: string[];
  setLine1: (value: string) => void;
  setLine2: (value: string) => void;
  setHours: (value: number) => void;
  setMinutes: (value: number) => void;
  setPlaylist: (value: string[]) => void;
  setImage?: (value: string) => void;
  isUpdateForm?: boolean;
}

export const ConfigForm: React.FC<Props> = ({
  line1,
  line2,
  hours,
  minutes,
  playlist,
  setLine1,
  setLine2,
  setHours,
  setMinutes,
  setPlaylist,
  setImage,
  isUpdateForm,
}) => {
  const [volumeDisplay, setVolumeDisplay] = useState(getVolume());

  const increaseVolume = () => {
    let changedVolume = getVolume();

    if (changedVolume === null || changedVolume >= 9) {
      changedVolume = 10;
    } else {
      changedVolume = changedVolume + 1;
    }

    setVolumeDisplay(changedVolume);
    setVolume(changedVolume);
  };

  const decreaseVolume = () => {
    let changedVolume = getVolume();

    if (changedVolume === null || changedVolume < 1) {
      changedVolume = 0;
    } else {
      changedVolume = changedVolume - 1;
    }

    setVolumeDisplay(changedVolume);
    setVolume(changedVolume);
  };

  return (
    <div className={isUpdateForm ? styles.updateForm : ''}>
      <P label>Hour</P>
      <NumberInput
        value={hours}
        placeholder='eg 14 for 2pm'
        onChange={setHours}
      />

      <P label>Minute</P>
      <NumberInput
        value={minutes}
        placeholder='eg 25 for 25-past the hour'
        onChange={setMinutes}
      />

      <P label>Line 1</P>
      <TextInput
        value={line1}
        placeholder="Don't make it too long"
        onChange={setLine1}
      />

      <P label>Line 2</P>
      <TextInput
        value={line2}
        placeholder="Don't make it too long"
        onChange={setLine2}
      />

      {!isUpdateForm && (
        <>
          <P bold title>
            Playlist
          </P>
          <P>
            Insert any URLs from YouTube, Facebook, Twitch, SoundCloud,
            Streamable, Vimeo, Wistia, Mixcloud, and DailyMotion - each
            separated by a comma
          </P>
          <P bold>
            You cannot update the playlist once the presentation is running
          </P>
          <P bold>
            If the music does not begin playing when the presentation starts,
            refresh the page - this is due to some browsers preventing videos
            with audio auto-playing
          </P>
          <TextInput
            value={(playlist || []).join(',')}
            placeholder='Comma-separated list of URLs'
            onChange={(value) => {
              setPlaylist(value.split(',').map((url) => url.trim()));
            }}
          />

          {setImage && (
            <>
              <P bold title>
                Mug Image
              </P>
              <P>Choose an image to display on the mug</P>
              <P bold>
                You cannot update the mug image once the presentation is running
              </P>
              <FileInput
                onSuccessfulUpload={setImage}
                acceptedFileTypes={['image/*']}
                fileNotSelectedText='File Not Selected'
                fileSelectedText='File Selected'
                fileUploadErrorText='File Upload Error'
              />
            </>
          )}
        </>
      )}

      {isUpdateForm &&
        playlist &&
        playlist.filter((item) => item !== '').length > 0 && (
          <>
            <P>
              Music Volume - Updates Immediately (
              {volumeDisplay !== null && volumeDisplay > 0
                ? `${volumeDisplay}0%`
                : `Muted`}
              )
            </P>
            <div className={styles.volume}>
              <Button disabled={volumeDisplay === 10} onClick={increaseVolume}>
                +
              </Button>
              <Button disabled={volumeDisplay === 0} onClick={decreaseVolume}>
                -
              </Button>
            </div>
          </>
        )}
    </div>
  );
};

export default ConfigForm;
