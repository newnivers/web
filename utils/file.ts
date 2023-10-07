const BYTES_PER_KB = 1024;

export const removeBase64Prefix = (base64Data: string): string => {
  return base64Data.replace(/^data:image\/[a-zA-Z+]+;base64,/, "");
};

export const base64ToUnit8Array = (base64Data: string): Uint8Array => {
  return Uint8Array.from(atob(base64Data), (char) => char.charCodeAt(0));
};

export const createImageBlob = (
  byteArray: Uint8Array,
  type: BlobPropertyBag["type"] = "image/jpeg"
) => {
  return new Blob([byteArray], { type });
};

export const checkFileSize = (fileSize: number, maximumMB: number) => {
  const maxSize = maximumMB * (BYTES_PER_KB * BYTES_PER_KB);
  const fileSizeInMB = fileSize / (BYTES_PER_KB * BYTES_PER_KB);

  return fileSizeInMB > maxSize;
};
