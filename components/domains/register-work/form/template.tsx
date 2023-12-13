import { useRef } from "react";
import type { ReactNode, MutableRefObject } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { UseFormRegister, Control, FieldValues } from "react-hook-form";
import styled, { css } from "styled-components";
import Spacer, { SpacerSkleton } from "@/components/common/spacer";
import { StepNavigator } from "@/components/domains/register-work/stepNavigator";
// import { useFileUpload } from "@/hooks";

interface Props {
  children: (
    register: UseFormRegister<FieldValues>,
    control: Control<FieldValues, any>,
    cacheImages: MutableRefObject<
      {
        name: string;
        source: string | ArrayBuffer | null;
      }[]
    >
  ) => ReactNode;
}

export function RegisterWorkFormTemplate({ children }: Props) {
  const { isFirstStep, isLastStep, movePrev, moveNext } =
    StepNavigator.onlyHook();

  const { register, control } = useForm();
  const cachedImages = useRef<
    { name: string; source: string | ArrayBuffer | null }[]
  >([]);

  // const { fileUpload } = useFileUpload();

  // const onTest = async () => {
  //   const domParser = new DOMParser();

  //   const parsedDOM = domParser.parseFromString(htmlRef.current, "text/html");

  //   const imgElements = Array.from(parsedDOM.querySelectorAll("img"));

  //   if (!imgElements) {
  //     return;
  //   }

  //   const uploadPromises = imgElements.map(async (imgElem) => {
  //     const imgInfo = cachedImgs.current.find(
  //       (cachedImg) => cachedImg.source === imgElem.src
  //     );

  //     if (imgInfo) {
  //       const result = await fileUpload(
  //         {
  //           name: imgInfo.name,
  //           data: imgInfo.source,
  //         },
  //         "image/png"
  //       );

  //       if (result?.Location) {
  //         imgElem.src = result.Location;
  //       }
  //     }
  //   });

  //   await Promise.all(uploadPromises);

  //   console.log(parsedDOM.documentElement.innerHTML);
  //   console.log(typeof parsedDOM.documentElement.innerHTML);
  // };

  return (
    <Spacer type="vertical" as="form" gap={78} restStyle={{ width: "100%" }}>
      <Content type="vertical" gap={52}>
        {children(register, control, cachedImages)}
      </Content>
      <StepController justify="flex-end" gap={10} align="center">
        {!isFirstStep && (
          <StepButton type="button" onClick={() => movePrev()}>
            <Image
              src="/icon/double-arrow-left.svg"
              width={16}
              height={16}
              alt="double-arrow-left"
            />
            <p>이전 페이지</p>
          </StepButton>
        )}

        {!isLastStep && (
          <StepButton type="button" onClick={() => moveNext()}>
            <p>다음 페이지</p>
            <Image
              src="/icon/double-arrow-right.svg"
              width={16}
              height={16}
              alt="dobule-arrow-right"
            />
          </StepButton>
        )}
        {isLastStep && (
          <>
            <StepButton type="button">미리보기</StepButton>
            <StepButton type="submit">작품등록</StepButton>
          </>
        )}
      </StepController>
    </Spacer>
  );
}

const Content = styled(SpacerSkleton)`
  flex: 1;
  position: relative;
  white-space: nowrap;
`;

const StepController = styled(SpacerSkleton)``;

const StepButton = styled.button`
  ${({ theme }) => {
    const { colors } = theme;

    return css`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px;
      width: 148px;
      height: 56px;
      border: 1px solid ${colors.secondary[400]};
      border-radius: 4px;
      color: ${colors.secondary[400]};
    `;
  }}
`;
