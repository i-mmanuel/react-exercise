"use client";

import React, { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import {
  IStyleSheetManager,
  ServerStyleSheet,
  ShouldForwardProp,
  StyleSheetManager as SSM,
} from "styled-components";
import isPropValid from "@emotion/is-prop-valid/dist/declarations/src";

type StyledComponentsRegistryProps = {
  children: React.ReactNode;
};

const shouldForwardPropFunc: ShouldForwardProp<"web"> = (propName, target) => {
  if (typeof target === "string") {
    // For HTML elements, forward the prop if it is a valid HTML attribute
    return isPropValid(propName);
  }
  // For other elements, forward all props
  return true;
};

const StyleSheetManager = ({
  children,
  enableVendorPrefixes,
  sheet,
}: IStyleSheetManager) => (
  <SSM
    shouldForwardProp={shouldForwardPropFunc}
    enableVendorPrefixes={enableVendorPrefixes}
    sheet={sheet}
  >
    {children}
  </SSM>
);

export const StyledComponentsRegistry = ({
  children,
}: StyledComponentsRegistryProps) => {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;

  return (
    <StyleSheetManager
      shouldForwardProp={shouldForwardPropFunc}
      enableVendorPrefixes={enableVendorPrefixes}
      sheet={sheet}
    >
      {children}
    </StyleSheetManager>
  );
};
