import { useRef } from "react";
import type { ReactNode, ChangeEvent, CSSProperties } from "react";

interface Props {
  thumbnailStyle: CSSProperties;
  children: ReactNode;
  onChangeFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

function HiddenFileInput({ thumbnailStyle, children, onChangeFile }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onClickFileInput = () => {
    if (!fileInputRef.current) {
      return;
    }

    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={onChangeFile}
      />
      <div
        onClick={onClickFileInput}
        style={{
          ...thumbnailStyle,
          position: "relative",
          cursor: "pointer",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default HiddenFileInput;
