import { useRef } from "react";
import TextEditor from "@/components/common/textEditor/textEditor";
// import { useFileUpload } from "@/hooks";

export function DetailInfo() {
  const htmlRef = useRef<string>("");
  const cachedImgs = useRef<
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
    <TextEditor
      _onImageUpload={({ file, source }) => {
        const fileName = file.name.split(".")[0];
        cachedImgs.current.push({ name: fileName, source });
      }}
      _onContentChange={({ html }) => {
        htmlRef.current = html;
      }}
    />
  );
}
