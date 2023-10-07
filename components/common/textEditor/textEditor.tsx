import { useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import type { ReactQuillProps } from "react-quill";
import styled, { css } from "styled-components";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

interface Props extends ReactQuillProps {
  height?: string;
  _onContentChange: (res: { html: string; text: string }) => void;
  _onImageUpload: (res: {
    file: File;
    source: string | ArrayBuffer | null;
  }) => void;
}

const SSRReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

    return function comp({ forwardedRef, ...props }: ForwardedQuillComponent) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const defaultToolbarContainer = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["clean"],
];

function TextEditor({
  height = "300px",
  _onContentChange,
  _onImageUpload,
  ...rest
}: Props) {
  const quillRef = useRef<ReactQuill | null>(null);

  const onImageUpload = useCallback(() => {
    if (!quillRef.current) {
      return;
    }

    const fileInput = document.createElement("input");

    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    document.body.appendChild(fileInput);

    fileInput.click();

    fileInput.onchange = () => {
      const { files } = fileInput;

      if (!files) {
        return;
      }

      const targetFile = files[0];

      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target || !quillRef.current) {
          return;
        }

        const base64Image = e.target.result;
        const range = quillRef.current.getEditorSelection();

        if (!range) {
          return;
        }

        quillRef.current
          .getEditor()
          .insertEmbed(range.index, "image", base64Image);

        const nextRange = range.index + 1;

        // @ts-expect-error NOTE: react-quill StaticRange type
        quillRef.current.getEditor().setSelection(nextRange);

        _onImageUpload({ file: targetFile, source: base64Image });

        const targetInput = document.body.querySelector(":scope > input");

        if (!targetInput) {
          return;
        }

        targetInput.remove();
      };

      reader.readAsDataURL(targetFile);
    };
  }, []);

  const onEditorChange = (
    value: string,
    _delta: any,
    _source: any,
    editor: any
  ) => {
    _onContentChange({ html: value, text: editor.getText() });
  };

  const createDefaultModules = useCallback(
    () => ({
      toolbar: {
        container: defaultToolbarContainer,
        handlers: {
          image: onImageUpload,
        },
      },
    }),
    []
  );

  const modules = useMemo(() => rest.modules ?? createDefaultModules(), []);

  return (
    <Container height={height}>
      <SSRReactQuill
        forwardedRef={quillRef}
        modules={modules}
        onChange={onEditorChange}
        {...rest}
      />
    </Container>
  );
}

const Container = styled.div<{ height: string }>`
  ${({ theme, height }) => {
    const { colors } = theme;

    return css`
      position: relative;

      & .ql-editor {
        height: ${height};
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        user-select: none;
      }

      & .ql-editor::before {
        font-size: 16px;
        font-weight: 400;
        line-height: 1.5;
        font-style: normal;
      }

      & .ql-editor strong {
        font-weight: bold;
      }
      & .ql-editor em {
        font-style: italic;
      }
    `;
  }}
`;

export default TextEditor;
