import type { CSSProperties } from "react";
import { useMemo, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import type ReactQuill from "react-quill";
import type { ReactQuillProps } from "react-quill";
import type { RuleSet } from "styled-components";
import styled, { css } from "styled-components";
import "./textEditorStyle.scss";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

interface Props extends ReactQuillProps {
  containerStyle?: CSSProperties;
  qlEditorStyle?: RuleSet<object>;
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
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "12px",
          borderColor: "#d4d4d4",
        }}
      >
        <p
          style={{
            fontWeight: "600",
            color: "#A6A6A6",
          }}
        >
          에디터 기본 정보를 가져오는 중..
        </p>
      </div>
    ),
  }
);

const defaultToolbarContainer = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image"],
  ["clean"],
];

function TextEditor({
  containerStyle = {},
  qlEditorStyle = css``,
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
    <Container style={containerStyle} $qlEditorStyle={qlEditorStyle}>
      <SSRReactQuill
        forwardedRef={quillRef}
        modules={modules}
        onChange={onEditorChange}
        {...rest}
      />
    </Container>
  );
}

const Container = styled.div<{ $qlEditorStyle: RuleSet<object> }>`
  ${({ theme, $qlEditorStyle }) => {
    const { colors } = theme;

    return css`
      position: relative;

      ${$qlEditorStyle}
    `;
  }}
`;

export default TextEditor;
