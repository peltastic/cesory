import classes from "../styles/admin.module.css";
type Props = {
  username: string;
  title: string;
};

function Dashboard(props: Props) {
  return (
    <section
      className={`${classes.Welcome} relative  px-16 pt-10 text-white w-full h-[35rem]`}
    >
      <h1 className="text-[5rem] font-bold">Welcome</h1>
      <p className="text-[2rem]">{props.username}</p>
      <h1 className="text-[4rem] bottom-10 right-16 absolute text-right">
        {props.title}
      </h1>
    </section>
  );
}

export default Dashboard;
