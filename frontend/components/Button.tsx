import { ReactNode } from "react";
import { FiArrowRight } from "react-icons/fi";
type Button = {
  content: string | ReactNode;
  type?: "link" | "cart";
  class: string;
  disabled?: boolean;
  clicked?: () => void;
};

const Button = (props: Button) => {
  const style =
    props.type === "cart"
      ? "rounded-full bg-[#fff]"
      : "rounded-full";
  return (
    <button
      disabled={props.disabled}
      onClick={props.clicked}
      className={` ${props.class} ${style}  flex items-center `}
    >
      {props.content}
      {props.type === "link" ? <FiArrowRight className="ml-4" /> : null}
    </button>
  );
};

export default Button;
