import img500x500 from './testImages/500x500';
import img250x500 from './testImages/250x500';
import img500x250 from './testImages/500x250';

import resizeImage, { dataURItoFile } from '.';

const checkImageIsOfSize = async (
  file: File,
  width: number,
  height: number
): Promise<boolean> => {
  const reader = new FileReader();
  const image = new Image();
  return new Promise<boolean>((resolve) => {
    reader.onload = (readerEvent) => {
      image.onload = () =>
        resolve(image.width === width && image.height === height);
      image.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
};

describe('Resize Image Utility', () => {
  describe('resizes an image as expected', () => {
    it('does nothing when an image is already samller in both dimensions', async () => {
      const image = await resizeImage(
        dataURItoFile(img500x500, 'testfile.jpg'),
        1000
      );

      expect(await checkImageIsOfSize(image, 500, 500)).toBe(true);
    });

    describe('successfully resizes when requested dimension is smaller', () => {
      it('when equal height and width', async () => {
        const image = await resizeImage(
          dataURItoFile(img500x500, 'testfile.jpg'),
          250
        );

        expect(await checkImageIsOfSize(image, 250, 250)).toBe(true);
      });

      it('when height is larger than width', async () => {
        const image = await resizeImage(
          dataURItoFile(img250x500, 'testfile.jpg'),
          250
        );

        expect(await checkImageIsOfSize(image, 125, 250)).toBe(true);
      });

      it('when width is larger than height', async () => {
        const image = await resizeImage(
          dataURItoFile(img500x250, 'testfile.jpg'),
          250
        );

        expect(await checkImageIsOfSize(image, 250, 125)).toBe(true);
      });
    });
  });
});
