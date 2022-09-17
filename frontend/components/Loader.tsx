type Props = {
  class: string;
};

function Loader(props: Props) {
  return <div className={`${props.class} block bg-[#3d3d3d] animate-pulse`}></div>;
}

export default Loader;
