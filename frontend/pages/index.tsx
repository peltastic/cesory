import type { NextPage } from "next";
import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import Featured from "../components/Featured";
import Ads from "../components/Ads";
import Ads2 from "../components/Ads2";

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Header />
      {/* <Featured heading="Featured Products" limit={3} /> */}
      <Categories />
      <Ads />
      <Featured />
      <Ads2 />
      {/* <Body /> */}
      <Footer />
    </div>
  );
};

export default Home;
