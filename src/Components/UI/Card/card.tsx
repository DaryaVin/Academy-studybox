import React, { forwardRef } from "react";
import "./card.scss";


export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode,
  className?: string,
  disabled?: boolean,
} 

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, disabled = false, ...props }, ref) => {

  let newClassName = "card"  + (className ? " " + className : "") + (disabled ? " card_disabled" : "");

    return (
      <div {...props} className={newClassName} ref={ref}>
        {children}
      </div>
    )
})
