import classes from "../styles/admin.module.css";
import Dashboard from "../components/Dashboard";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
type Props = {};

function Admin({}: Props) {
  const username = useSelector(
    (state: RootState) => state.user.userInfo.username
  );
  return (
    <>
      <div className={`${classes.Container} flex flex-wrap mt-[6rem]`}>
        <div className={`${classes.DashBoard} w-[49%] mr-2`}>
          <Dashboard title={"Admin Dashboard"} username={username} />
        </div>
        <div className={`w-[50%] ${classes.Options}`}>
          <section
            className={`w-full h-[30rem] relative text-white mb-[.5rem] ${classes.Add}`}
          >
            <div className=" absolute top-[50%] left-[30%] -translate-x-[50%] -translate-y-[50%]">
              <h1 className="mb-7 text-3xl">ADD PRODUCTS</h1>
              <Link href={"/add"}>
                <a className="flex font-bold text-[1.2rem] items-center bg-white text-[#B3541E] px-[1.2rem] w-[7rem] rounded-[2rem] py-[.5rem]">
                  Next
                  <FiArrowRight className="ml-2" />
                </a>
              </Link>
            </div>
          </section>
          <section
            className={`w-full h-[30rem] relative text-white ${classes.Orders}`}
          >
            <div className=" absolute top-[50%] left-[30%] -translate-x-[50%] -translate-y-[50%]">
              <h1 className="mb-7 text-3xl">VIEW ORDERS</h1>
              <Link href={"/orders"}>
                <a className="flex font-bold text-[1.2rem] items-center bg-white text-[#B3541E] px-[1.2rem] w-[7rem] rounded-[2rem] py-[.5rem]">
                  Next
                  <FiArrowRight className="ml-2" />
                </a>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Admin;
