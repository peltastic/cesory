import classes from "../styles/navmobile.module.css";
import Link from "next/link";
import styles from "../styles/nav.module.css";
type Props = {
  logout: () => void;
  show: boolean;
  isAdmin: boolean;
  userId: boolean;
  clicked?: () => void;
};

function NavMobile(props: Props) {
  return (
    <div
      className={`${classes.NavMobile}  ${
        !props.show ? "-translate-x-full" : null
      } transition-all fixed top-0 text-white w-[100%] bg-stone-800 z-[60] h-screen `}
    >
      <ul className="">
        <li>
          <Link href={"/"}>
            <a onClick={props.clicked}>Home</a>
          </Link>
        </li>
        <li>
          <Link href={"/products"}>
            <a onClick={props.clicked}>Products</a>
          </Link>
        </li>
        {!props.userId ? (
          <li>
            <Link href={"/login"}>
              <a onClick={props.clicked}>Sign In</a>
            </Link>
          </li>
        ) : (
          <li className="mx-[4rem]">
            <button onClick={props.logout}>Logout</button>
          </li>
        )}
        {props.isAdmin && props.userId ? (
          <li>
            <Link href={"/admin"}>
              <a>
                <button
                  className={`mr-10 rounded-full w-[15rem] px-6 py-2 ${styles.Admin}`}
                >
                  Admin
                </button>
              </a>
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default NavMobile;
