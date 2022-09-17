import classes from "../styles/messages.module.css";
import Link from "next/link";
type Props = {
  className: string;
  link: string;
  name: string;
};

export default function Messages(props: Props) {
  const baseUrl = "https://techstore8.vercel.app/";
  return (
    <Link href={baseUrl + props.link}>
      <a>
        <div
          className={`fixed bottom-[1rem] cursor-pointer right-0 ${props.className} w-[20rem] z-50 px-8 py-[3rem] ${classes.Messages}`}
        >
          <h1 className="mx-auto text-center glow text-white text-4xl">
            {props.name}
          </h1>
        </div>
      </a>
    </Link>
  );
}
