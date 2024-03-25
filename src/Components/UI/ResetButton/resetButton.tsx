import React from "react";
import "./resetButton.scss";

interface ResetButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isShow?: boolean
}
export const ResetButton = ({ isShow = true, ...props }: ResetButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={ "resetButton"
        + (!isShow ? " resetButton_noShow" : "")
        + (props.className ? " " + props.className : "")
      }
    >
      Очистить
    </button>
  )
}
