
type Props = {
  filter_name: string;
  clicked: (value: string) => void;
  class?: string;
};

const Filter = (props: Props) => {
  return (
    <button
      className={`${props.class}
     
      rounded-full  px-[.8rem] xs:px-[1rem]  py-2 text-xl xs:text-2xl transition-all text-black`}
      onClick={() => props.clicked(props.filter_name.toLowerCase())}
    >
      {props.filter_name}
    </button>
  );
};

export default Filter;
