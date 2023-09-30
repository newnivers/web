import { useState } from "react";
import type { ChangeEvent } from "react";
import { useIsomorphicLayoutEffect } from "@newnivers/react";
import AWS from "aws-sdk";

interface FileInfo {
  name: string;
  data: string | ArrayBuffer | null;
}

const BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string;
const REGION = process.env.NEXT_PUBLIC_S3_REGION as string;
const ACCESS_KEY_ID = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID as string;
const SECRET_ACCESS_KEY_ID = process.env
  .NEXT_PUBLIC_S3_SECRET_ACCESS_KEY_ID as string;

function useFileUpload(profileImage: string | null) {
  const [fileInfo, setFileInfo] = useState<FileInfo>({
    name: "",
    data: "",
  });

  const fileUpload = async () => {
    if (!fileInfo.name || !fileInfo.data) {
      return;
    }

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
          Body: fileInfo.data,
        },
      });

      const result = await upload.promise();

      return result;
    } catch (error: any) {
      throw error.message;
    }
  };

  const resetFile = () => {
    if (profileImage) {
      setFileInfo({
        ...fileInfo,
        data: profileImage,
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
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  useIsomorphicLayoutEffect(() => {
    if (!profileImage) {
      return;
    }

    setFileInfo({
      ...fileInfo,
      data: profileImage,
    });
  }, []);

  return [fileInfo, onChangeFile, fileUpload, resetFile] as const;
}

export default useFileUpload;
