import { createElement } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export enum TextTags {
  b = "b",
  blockquote = "blockquote",
  br = "br",
  dd = "dd",
  del = "del",
  dt = "dt",
  div = "div",
  em = "em",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
  hr = "hr",
  i = "i",
  ins = "ins",
  li = "li",
  mark = "mark",
  p = "p",
  small = "small",
  span = "span",
  strong = "strong",
  sub = "sub",
  sup = "sup",
}

interface Props extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  as?: TextTags;
}

function Text({ children, as = TextTags.p, ...rest }: Props) {
  return createElement(as, { ...rest }, [children]);
}

export default Text;
