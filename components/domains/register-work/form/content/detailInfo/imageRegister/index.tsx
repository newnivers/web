import type { ChangeEvent } from "react";
import Image from "next/image";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { useFileUpload } from "@/hooks";

export function ImageRegister({ ...controllerProps }: UseControllerProps) {
  const { field } = useController(controllerProps);

  const { fileInfo, onChangeFile } = useFileUpload({
    onFileChangedSuccess(fileInfo) {
      field.onChange(fileInfo);
    },
  });

  return (
    <>
      {fileInfo.data ? (
        <RegisteredImageInfo>이미지등록</RegisteredImageInfo>
      ) : (
        <>
          <ImageRegisterLabel
            justify="center"
            align="center"
            gap={8}
            as="label"
            htmlFor="work-image-register"
          >
            <Image
              src="/icon/file-download.svg"
              width={24}
              height={24}
              alt="file-download"
            />
            <ImageGuideTypography typo="body03">
              이미지를 등록해주세요.
            </ImageGuideTypography>
          </ImageRegisterLabel>
          <HiddenInput
            type="file"
            id="work-image-register"
            accept="image/png, image/jpeg"
            onChange={onChangeFile}
          />
        </>
      )}
    </>
  );
}

const ImageRegisterLabel = styled(SpacerSkleton)`
  flex: 1;
  padding: 24px;
  border: 1px solid ${({ theme: { colors } }) => colors.secondary[200]};
  border-radius: 12px;
  cursor: pointer;
`;

const HiddenInput = styled.input`
  position: absolute;
  clip: rect(0 0 0 0);
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  height: 0;
`;

const ImageGuideTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[400]};
`;

const RegisteredImageInfo = styled.div``;
