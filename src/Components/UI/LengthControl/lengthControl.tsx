import React from "react";
import "./lengthControl.scss";

interface LengthControlProps extends React.HTMLAttributes<HTMLDivElement>{
  children: JSX.Element,
}
export const LengthControl = ({children, className, ...props}: LengthControlProps) => {
  const newClassName = "lengthControlComponent" + (className ? " " + className :"");
  const DefinitionValueFunc = (children: JSX.Element): string => {
    let val = "";
    if (children.type === "input" || children.props.value) {
      val = children.props.value !== "" ? children.props.value : children.props.placeholder;
    } else {
      if (children.props.children) {
        if (Array.isArray(children.props.children)) {
          val = DefinitionValueFunc(children.props.children[0]);
        } else {
          if (children.props.children.type) {
            val = DefinitionValueFunc(children.props.children);
          }
          if (typeof children.props.children === "string") {
            val = children.props.children;
          }
        }
      }
    }
    return val;
  }
  let lengthDefinitionElementValue = DefinitionValueFunc(children);

  const newChildren = React.cloneElement(children,
    {
      className: "lengthControlComponent__mainElement " + children.props.className,
    },
  );

  return (
    <>
      <div className={newClassName} {...props} >
        <span key={"lengthDefinitionElement"} className="lengthControlComponent__lengthDefinitionElement">
          {lengthDefinitionElementValue}
        </span>
        {newChildren}
      </div>
    </>
  )
}
