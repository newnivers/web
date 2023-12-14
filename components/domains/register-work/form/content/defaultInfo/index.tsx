import type { FormContentProps } from "../type";

export function DefaultInfo({ classifications }: FormContentProps) {
  console.log("default", classifications);

  return <div>defaultInfo</div>;
}
