import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "./Button";

type Props = {
  filter_name: string;
  clicked: (value: string) => void;
  class?: string;
};

const Filter = (props: Props) => {
  return (
    <button
      className={`${props.class} 
     
      rounded-full  px-[1rem] py-2 text-2xl transition-all text-black`}
      onClick={() => props.clicked(props.filter_name.toLowerCase())}
    >
      {props.filter_name}
    </button>
  );
};

export default Filter;
