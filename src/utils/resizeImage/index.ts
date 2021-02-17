const MAX_IMAGE_DIMENSION = parseInt(
  process.env.PUBLIC_MAX_IMAGE_DIMENSION || '1280',
  10
);

// This whole util is pretty much lifted from StackOverflow (for shame!) - but I think this circumstance
// is fine to let someone more intelligent than I figure out nonsense around BlobParts etc.
// See: https://stackoverflow.com/a/39235724/3905891

export const dataURItoFile = (dataURI: string, fileName: string): File => {
  const bytes =
    dataURI.split(',')[0].indexOf('base64') >= 0
      ? atob(dataURI.split(',')[1])
      : unescape(dataURI.split(',')[1]);
  const mime = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const max = bytes.length;
  const ia = new Uint8Array(max);
  for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
  return new File([ia], fileName, { type: mime });
};

const resizeImage = async (
  file: File,
  maxSize: number = MAX_IMAGE_DIMENSION
): Promise<File> => {
  const reader = new FileReader();
  const image = new Image();
  const canvas = document.createElement('canvas');

  const resize = () => {
    let width = image.width;
    let height = image.height;

    if (width > height) {
      if (width > maxSize) {
        height *= maxSize / width;
        width = maxSize;
      }
    } else if (height > maxSize) {
      width *= maxSize / height;
      height = maxSize;
    }

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);
    return dataURItoFile(canvas.toDataURL('image/jpeg'), file.name);
  };

  return new Promise<File>((resolve, reject) => {
    if (!file.type.match(/image.*/)) {
      reject(new Error('Not an image'));
      return;
    }

    reader.onload = (readerEvent) => {
      image.onload = () => resolve(resize());
      image.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export default resizeImage;
