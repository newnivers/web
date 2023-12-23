import type { ReactNode } from "react";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
}

export function ModalPortal({ children }: Props) {
  const modalPortalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const $modalPortalElem = document.getElementById("modal-portal");

    if (!$modalPortalElem) {
      return;
    }

    modalPortalRef.current = $modalPortalElem;
  }, []);

  if (!modalPortalRef.current) {
    return null;
  }

  return createPortal(children, modalPortalRef.current);
}
