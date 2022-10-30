import classNames from "classnames";
import React from "react";
export type TextGradientProps = {
  children: React.ReactNode;
  className?: string;
};
export const TextGradient = ({ children, className }: TextGradientProps) => {
  return <div className={"TextGradient " + className}>{children}</div>;
};
