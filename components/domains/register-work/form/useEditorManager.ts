import { useCallback, useRef } from "react";
import type { EditorImage } from "../shared/type";
import { StepNavigator } from "../stepNavigator";

export function useEditorManager() {
  const { currentStep } = StepNavigator.onlyHook();

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

  return {
    cachedEditorImages,
    updateEditorImages,
  };
}
