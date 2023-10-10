import type { MutableRefObject } from "react";
import { Controller } from "react-hook-form";
import type { Control, FieldValues } from "react-hook-form";
import TextEditor from "@/components/common/textEditor/textEditor";

interface Props {
  control: Control<FieldValues, any>;
  cachedImages: MutableRefObject<
    {
      name: string;
      source: string | ArrayBuffer | null;
    }[]
  >;
}

export function DetailInfo({ control, cachedImages }: Props) {
  return (
    <Controller
      control={control}
      name="detail"
      render={({ field: { onChange } }) => (
        <TextEditor
          _onImageUpload={({ file, source }) => {
            const fileName = file.name.split(".")[0];
            cachedImages.current.push({ name: fileName, source });
          }}
          _onContentChange={({ html }) => {
            onChange(html);
          }}
        />
      )}
    />
  );
}
