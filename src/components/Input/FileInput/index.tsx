import React, { useState } from 'react';

import P from '../../P';

import styles from './styles.scss';

interface Props {
  acceptedFileTypes: string[];
  fileNotSelectedText: string;
  fileSelectedText: string;
  fileUploadErrorText: string;
  onSuccessfulUpload: (fileString: string) => void;
}

enum STATUS {
  AWAITING_FILE,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
}

const FileInput: React.FC<Props> = ({
  acceptedFileTypes,
  fileNotSelectedText,
  fileSelectedText,
  fileUploadErrorText,
  onSuccessfulUpload,
}) => {
  const [state, setState] = useState({
    status: STATUS.AWAITING_FILE,
    fileUrl: '',
    fileName: '',
  });
  const { status, fileUrl, fileName } = state;

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];

        const fileString = URL.createObjectURL(file);

        setState({
          ...state,
          status: STATUS.UPLOAD_SUCCESS,
          fileName: file.name,
          fileUrl: fileString,
        });

        onSuccessfulUpload(fileString);
      } else {
        setState({
          ...state,
          fileName: '',
          fileUrl: '',
          status: STATUS.AWAITING_FILE,
        });
      }
    } catch (error) {
      setState({
        fileName: '',
        fileUrl: '',
        status: STATUS.UPLOAD_ERROR,
      });
    }
  };

  let text = fileNotSelectedText;
  switch (status) {
    case STATUS.UPLOAD_SUCCESS:
      text = fileSelectedText;
      break;
    case STATUS.UPLOAD_ERROR:
      text = fileUploadErrorText;
      break;
    default:
    // do nothing
  }

  const image = <img className={styles.image} src={fileUrl} alt={fileName} />;
  let uploadingArea: JSX.Element | null = null;

  if (status === STATUS.UPLOAD_SUCCESS && fileUrl) {
    uploadingArea = image;
  }

  return (
    <>
      {status === STATUS.UPLOAD_ERROR && <P>{text}</P>}
      <input
        onChange={onFileChange}
        className={styles.input}
        type='file'
        accept={acceptedFileTypes.join(',')}
        name='ImageUpload'
        id='ImageUpload'
      />
      {uploadingArea}
    </>
  );
};

export default FileInput;
