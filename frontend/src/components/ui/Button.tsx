import React, { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: String;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const varientType = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};

const sizeTypes = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-3 px-6",
};
const defaultStyles = "rounded-md flex ";
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${varientType[props.varient]} ${defaultStyles} ${sizeTypes[props.size]}`}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
      {props.text} {props.endIcon}
    </button>
  );
};
export default Button;
