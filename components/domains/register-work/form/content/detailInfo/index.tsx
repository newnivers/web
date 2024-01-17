import { Controller } from "react-hook-form";
import { css } from "styled-components";
import { TitleColumn, InputColumn } from "@/components/common/column";
import { SpacerSkleton } from "@/components/common/spacer";
import TextEditor from "@/components/common/textEditor";
import { ImageRegister } from "./imageRegister";
import { WorkForm } from "../../context";
import type { FormContentProps } from "../type";

export function DetailInfo({ classifications }: FormContentProps) {
  const {
    workForm: { control, getValues },
    editorManager,
  } = WorkForm.onlyHook();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { description, caution_description } = getValues();

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
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange } }) => (
            <TextEditor
              defaultValue={description}
              containerStyle={{ width: "100%" }}
              qlEditorStyle={css`
                .ql-editor {
                  min-height: fit-content;
                  height: 500px;
                }
                .ql-toolbar.ql-snow {
                  display: flex;
                }
              `}
              _onImageUpload={({ file, source }) => {
                editorManager.updateEditorImages(file, source);
              }}
              _onContentChange={({ html }) => {
                onChange(html);
              }}
            />
          )}
        />
      </InputColumn>
      <InputColumn
        id="caution_description"
        name="예매 유의사항"
        spacer={{ align: "start", gap: 16 }}
      >
        <Controller
          control={control}
          name="caution_description"
          render={({ field: { onChange } }) => (
            <TextEditor
              defaultValue={caution_description}
              containerStyle={{ width: "100%" }}
              qlEditorStyle={css`
                .ql-editor {
                  min-height: fit-content;
                  height: 500px;
                }
                .ql-toolbar.ql-snow {
                  display: flex;
                }
              `}
              _onImageUpload={({ file, source }) => {
                editorManager.updateEditorImages(file, source);
              }}
              _onContentChange={({ html }) => {
                onChange(html);
              }}
            />
          )}
        />
      </InputColumn>
    </SpacerSkleton>
  ));
}
