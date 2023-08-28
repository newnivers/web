'use client'

import {ReactNode, useState} from 'react';
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({children}: { children: ReactNode }) {
    const [styleComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styleComponentsStyleSheet.getStyleElement();
        styleComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>
    })

  if(typeof window !== 'undefined') {
    return <>{children}</>
 }

  return (
    <StyleSheetManager sheet={styleComponentsStyleSheet.instance}>
        {children}
    </StyleSheetManager>
  )
}