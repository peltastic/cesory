import React from "react";

type Props = {
  class: string;
  placeholder: string;
  changed: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const Search = (props: Props) => {
  return (
    <input
      type="text"
      className={`${props.class} outline-none`}
      placeholder={props.placeholder}
      onChange={props.changed}
    />
  );
};

export default Search;
