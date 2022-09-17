import { BiHide, BiShowAlt } from "react-icons/bi";
type Props = {
  type: string;
  placeholder: string 
  changed: (e: any) => void;
  value: string | number;
  class: string;
  clicked: () => void | string;
  show: boolean | string;
  section: string
};

function Input(props: Props) {
  return (
    <div
      className={`
      ${props.section === "add"? "w-[60%]": null}
      ${
        props.placeholder === "Password"  ?  "" : null
      } relative`}
    >
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.changed}
        value={props.value}
        className={`${props.class} block rounded-xl outline-none focus:border-2 transition-all px-5 py-5 text-3xl text-center text-[#514e4e] border`}
      />
      {props.placeholder === "Password" ? (
        <>
          {props.show ? (
            <BiShowAlt onClick={props.clicked} className="absolute top-[50%] right-[6rem] cursor-pointer text-3xl  text-black -translate-y-[50%] " />
          ) : (
            <BiHide onClick={props.clicked} className="absolute top-[50%] right-[6rem] cursor-pointer text-3xl  text-black -translate-y-[50%] " />
          )}
        </>
      ) : null}
    </div>
  );
}

export default Input;
