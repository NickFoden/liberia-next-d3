import React, { useEffect } from "react";
import Head from "next/head";
import Nav from "../components/nav";
import drawScatterChart from "../components/Charts/index";

const Home = () => {
  useEffect(() => {
    drawScatterChart();
  }, []);
  return (
    <div>
      <Head>
        <title>Liberia + Next + D3</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <div className="hero">
        <h1 className="title">Liberia + Next + D3</h1>
      </div>
      <div id="wrapper"></div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
