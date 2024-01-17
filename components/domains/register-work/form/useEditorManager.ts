import { useCallback, useRef } from "react";
import { useFileUpload } from "@/hooks";
import type { EditorImage } from "../shared/type";
import { StepNavigator } from "../stepNavigator";

export function useEditorManager() {
  const { currentStep } = StepNavigator.onlyHook();
  const { fileUpload } = useFileUpload();

  const cachedEditorImages = useRef<EditorImage[]>([]);

  const checkDuplicateImage = (inputSource: string | ArrayBuffer | null) => {
    return cachedEditorImages.current.find(
      (cachedImage) => cachedImage.source === inputSource
    );
  };

  const updateEditorImages = useCallback(
    (file: File, source: string | ArrayBuffer | null) => {
      if (currentStep !== "detail") {
        return;
      }

      if (checkDuplicateImage(source)) {
        return;
      }

      const fileName = file.name.split(".")[0];
      cachedEditorImages.current.push({
        name: fileName,
        source,
      });
    },
    [currentStep]
  );

  const processCachedImagesFromHtml = useCallback(
    async (originHtml: string) => {
      const domParser = new DOMParser();

      const parsedDOM = domParser.parseFromString(originHtml, "text/html");

      const imgElements = Array.from(parsedDOM.querySelectorAll("img"));

      if (!imgElements) {
        return;
      }

      const uploadPromises = imgElements.map(async (imgElem) => {
        const imgInfo = cachedEditorImages.current.find(
          (cachedImage) => cachedImage.source === imgElem.src
        );

        if (imgInfo) {
          const result = await fileUpload(
            {
              name: imgInfo.name,
              data: imgInfo.source,
            },
            "image/png"
          );

          if (result?.Location) {
            imgElem.src = result.Location;
          }
        }
      });

      await Promise.all(uploadPromises);

      return parsedDOM.documentElement.innerHTML;
    },
    [fileUpload]
  );

  return {
    cachedEditorImages,
    updateEditorImages,
    processCachedImagesFromHtml,
  };
}
