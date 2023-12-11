import { useRef } from "react";
import type { ReactNode, MutableRefObject } from "react";
import { useForm } from "react-hook-form";
import type { UseFormRegister, Control, FieldValues } from "react-hook-form";
import styled from "styled-components";
import DefaultButton from "@/components/common/button";
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
    <Spacer type="vertical" as="form" align="center" gap={30}>
      <FormWrapper>{children(register, control, cachedImages)}</FormWrapper>
      <StepController gap={10} align="center">
        {!isFirstStep && (
          <DefaultButton
            type="button"
            sort="secondary"
            onClick={() => movePrev()}
          >
            이전
          </DefaultButton>
        )}

        {!isLastStep && (
          <DefaultButton type="button" onClick={() => moveNext()}>
            다음
          </DefaultButton>
        )}
        {isLastStep && <DefaultButton type="submit">전송</DefaultButton>}
      </StepController>
    </Spacer>
  );
}

const FormWrapper = styled(SpacerSkleton)`
  position: relative;
  white-space: nowrap;
`;

const StepController = styled(SpacerSkleton)``;
