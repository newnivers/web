import { useState } from "react";
import type { ChangeEvent } from "react";
import { useIsomorphicLayoutEffect } from "@newnivers/react";
import AWS from "aws-sdk";
import {
  removeBase64Prefix,
  base64ToUnit8Array,
  createImageBlob,
} from "@/utils/file";

interface FileInfo {
  name: string;
  data: string | ArrayBuffer | null;
}

const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string;
const REGION = process.env.NEXT_PUBLIC_S3_REGION as string;
const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY_ID = process.env
  .NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID as string;

function useFileUpload(
  args: {
    originImage?: string;
    onFileChangedSuccess?: (fileInfo: FileInfo) => void;
  } = {}
) {
  const { originImage, onFileChangedSuccess } = args;

  const [fileInfo, setFileInfo] = useState<FileInfo>({
    name: "",
    data: "",
  });

  const fileUpload = async (
    fileInfo: {
      name: string | undefined;
      data: any;
    },
    type?: string
  ) => {
    if (!fileInfo.name || !fileInfo.data) {
      return;
    }

    const base64Data = removeBase64Prefix(fileInfo.data);
    const byteArray = base64ToUnit8Array(base64Data);

    const blob = createImageBlob(byteArray, type);

    try {
      AWS.config.update({
        region: REGION,
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY_ID,
      });

      const upload = new AWS.S3.ManagedUpload({
        params: {
          ACL: "public-read",
          Bucket: BUCKET_NAME,
          Key: `asset/${fileInfo.name}`,
          Body: blob,
        },
      });

      const result = await upload.promise();

      return result;
    } catch (error: any) {
      throw error.message;
    }
  };

  const resetFile = () => {
    if (originImage) {
      setFileInfo({
        ...fileInfo,
        data: originImage,
      });

      return;
    }
    setFileInfo({
      name: "",
      data: "",
    });
  };

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;

    if (!files) {
      return;
    }

    const file = files[0];
    const { name } = file;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFileInfo({ name, data: reader.result });

      if (onFileChangedSuccess) {
        onFileChangedSuccess({ name, data: reader.result });
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!originImage) {
      return;
    }

    setFileInfo({
      ...fileInfo,
      data: originImage,
    });
  }, []);

  return { fileInfo, onChangeFile, fileUpload, resetFile };
}

export default useFileUpload;
