import React from "react";
import "./radioBox.scss";

interface RadioBoxProps extends  React.InputHTMLAttributes<HTMLInputElement>{
  label?: string,
  children?:  React.ReactNode,
  type?: "radio",
  className?: string,
}
export const RadioBox = ({label, className, children, ...props}: RadioBoxProps) => {
  return (
    <>
    <label className={"radioBox" + (className ? " " + className : "")}>
      <div className={"radioBox__field" + (props.checked ? " " + "radioBox__field_checked" : "")}>
        <input type={"radio"} className="radioBox__button" {...props}></input>
        <div className="radioBox__checkmark">
          <div className="radioBox__innerPoint"></div>
        </div>
      </div>
      <div className={"radioBox__label"}>
        {label}
        {children}
      </div>
    </label>
    </>
  )
}
