import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { css } from "styled-components";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { SpacerSkleton } from "@/components/common/spacer";
import TextEditor from "@/components/common/textEditor";
import { defaultDescription, defaultCautionDescription } from "./data";
import { ImageRegister } from "./imageRegister";
import type { FormContentProps } from "../type";

export function DetailInfo({ classifications }: FormContentProps) {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      image: { name: "", data: null },
      description: defaultDescription,
      caution_description: defaultCautionDescription,
    },
  });

  return classifications.map(({ key, name, desc }) => (
    <SpacerSkleton key={key} type="vertical" gap={24}>
      <TitleColumn name={name} desc={desc} />
      <InputColumn
        id="image"
        name="이미지 등록"
        spacer={{ align: "start", gap: 30 }}
      >
        <ImageRegister control={control} name="image" />
      </InputColumn>
      <InputColumn
        id="description"
        name="상세 페이지"
        spacer={{ align: "start", gap: 30 }}
      >
        <TextEditor
          defaultValue={defaultDescription}
          containerStyle={{ width: "100%" }}
          qlEditorStyle={css`
            .ql-editor {
              min-height: fit-content;
            }
            .ql-toolbar.ql-snow {
              display: flex;
            }
          `}
          _onContentChange={(res) => {}}
          _onImageUpload={(res) => {}}
        />
      </InputColumn>
      <InputColumn
        id="caution_description"
        name="예매 유의사항"
        spacer={{ align: "start", gap: 16 }}
      >
        <TextEditor
          defaultValue={defaultCautionDescription}
          containerStyle={{ width: "100%" }}
          qlEditorStyle={css`
            .ql-editor {
              min-height: fit-content;
            }
            .ql-toolbar.ql-snow {
              display: flex;
            }
          `}
          _onContentChange={(res) => {}}
          _onImageUpload={(res) => {}}
        />
      </InputColumn>
    </SpacerSkleton>
  ));
}
