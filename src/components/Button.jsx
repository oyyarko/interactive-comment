/* eslint-disable react/prop-types */
import { useMemo } from "react";

const Button = (props) => {
  const variant = useMemo(() => {
    switch (props.variant) {
      case "danger":
        return "text-white bg-soft-red hover:bg-pale-red";
      case "outline-danger":
        return "text-soft-red bg-transparent hover:text-pale-red";
      case "outline":
        return "text-primary-color bg-transparent hover:text-light-grayish-color";
      default:
        return "text-white bg-primary-color hover:bg-light-grayish-color";
    }
  }, [props.variant]);

  return (
    <div
      className={`${variant} ${
        props.class ? props.class : ""
      } font-medium hover:cursor-pointer rounded-md text-sm px-3 py-1.5 me-2 mb-2 flex items-center gap-1 text-center justify-center`}
      type={props.type}
      onClick={props.onClick}
    >
      {props.icon ? props.icon : null}
      {props.label}
    </div>
  );
};

export default Button;
