import React from "react";
import "./validationMessage.scss";
import { useValidationFieldFormReturn } from "../../../hooks/useValidationFieldForm.ts";

type ValidationMessageProps =  React.HTMLAttributes<HTMLDivElement> & useValidationFieldFormReturn;
export const ValidationMessage = ({ isDirty, isValid, message, ...props }: ValidationMessageProps) => {
  let currentMessage = Object.values(message).find(item => item !== "");
  return (
    isDirty && !isValid && currentMessage !== ""
      ? <div {...props} className={props.className ? "validationMessage " + props.className : "validationMessage" }>
        {currentMessage}
      </div>
      : <></>
  )
}
