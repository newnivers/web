import Image from "next/image";
import type { UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import styled, { css } from "styled-components";
import { SpacerSkleton } from "@/components/common/spacer";
import Typography from "@/components/common/text/Typography";
import { useFileUpload } from "@/hooks";

export function ImageRegister({ ...controllerProps }: UseControllerProps) {
  const { field } = useController(controllerProps);

  const { fileInfo, onChangeFile, resetFile } = useFileUpload({
    onFileChangedSuccess(fileInfo) {
      field.onChange(fileInfo);
    },
  });

  const onClickImageDelete = () => {
    resetFile();
    field.onChange({ name: "", data: null });
  };

  return (
    <>
      {fileInfo.data ? (
        <RegisteredImageInfo>
          <RowHeader justify="space-between" align="center">
            <FileTypography typo="subhead05">파일명</FileTypography>
            {/* <SpacerSkleton gap={26}></SpacerSkleton> */}
          </RowHeader>
          <ImageInfoContent justify="space-between" align="center">
            <SpacerSkleton align="center" gap={8}>
              <button onClick={onClickImageDelete}>
                <Image
                  src="/icon/default-close.svg"
                  width={16}
                  height={16}
                  alt="default-close"
                />
              </button>
              <ImageNameTypography typo="subhead05">
                {fileInfo.name}
              </ImageNameTypography>
            </SpacerSkleton>
          </ImageInfoContent>
        </RegisteredImageInfo>
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

const commonContainerStyle = () => css`
  flex: 1;
  border: 1px solid ${({ theme: { colors } }) => colors.secondary[200]};
  border-radius: 12px;
`;

const ImageRegisterLabel = styled(SpacerSkleton)`
  ${commonContainerStyle()}
  padding: 24px;
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

const RegisteredImageInfo = styled.div`
  ${commonContainerStyle()}
  height: 73px;
`;

const RowHeader = styled(SpacerSkleton)`
  padding: 7px 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({ theme: { colors } }) => colors.secondary[200]};
`;

const FileTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[400]};
`;

const ImageInfoContent = styled(SpacerSkleton)`
  padding: 8px 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: ${({ theme: { colors } }) => colors.secondary.white};
`;

const ImageNameTypography = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.secondary[500]};
`;
