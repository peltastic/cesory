import React from "react";

type Props = {
  class: string;
  placeholder: string;
};

const Search = (props: Props) => {
  return (
    <input
      type="text"
      className={`${props.class} outline-none`}
      placeholder={props.placeholder}
    />
  );
};

export default Search;
