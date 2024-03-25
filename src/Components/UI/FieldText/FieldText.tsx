import React, { forwardRef, useImperativeHandle, useRef } from "react";
import "./fieldText.scss";
import { Card, CardProps } from "../Card/card.tsx";

interface FieldTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode,
  wrapProps?: CardProps,

}

export const FieldText = forwardRef<React.RefObject<HTMLInputElement>, FieldTextProps>(({ children, wrapProps, ...props }, ref) => {

  let newClassName = "fieldText"
    + (wrapProps?.className ? " "
      + wrapProps.className : "")
    + (wrapProps?.disabled ? " fieldText_disabled" : "");

  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => {
    return inputRef;
  }, []);

  const onClickField = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => { 
    if (e.target === e.currentTarget) inputRef.current?.focus();
   }

  return (
    <Card {...wrapProps} className={newClassName} onClick={onClickField} >
      <input
        {...props}
        className={"fieldText__input" + (props.className ? " " + props.className : "")}
        ref={inputRef}
      />
      {children}
      <div></div>
    </Card>
  )
})