import React from "react";
import "./label.scss";

interface LabelProps {
  label: string,
  children: React.ReactNode,
  [key: string]: any,
}
export const Label = ({ label, children, ...props }: LabelProps) => {
  return (
    <label
      className="label"
      {...props}
    >
      <span key={"text"} className="label__text">{label}</span>
      {children}
    </label>
  )
}
