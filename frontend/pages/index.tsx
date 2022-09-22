import { useEffect } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Categories from "../components/Categories";
import Featured from "../components/Featured";
import Ads from "../components/Ads";
import Ads2 from "../components/Ads2";
import AOS from "aos"
import 'aos/dist/aos.css';

const Home: NextPage = () => {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div className="h-screen">
      <Header />
      <Categories />
      <Ads />
      <Featured limit={4} heading="Featured Products" />
      <Ads2 />
      <Footer />
    </div>
  );
};

export default Home;
