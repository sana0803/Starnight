import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import Head from 'next/head';
import Image from 'next/image';
// import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.scss";
const Home: NextPage = () => {
  const circleBackground = useRef(null);

  const arr = [50, 45, 40, 35, 30, 25, 20, 15, 10];
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      console.log(scrollTop);
      // if (scrollTop >= 1080) {

      // }
      circleBackground.current.style.borderRadius = `${arr[
        Math.floor(scrollTop / 100)
      ]}%`;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div>
      <article className={styles.articleTarget}>
        <div id={styles.stars}></div>
        <section id={styles.mainText}>
          저희가
          <br></br>
          무엇을 할 수 있는지
          <br></br>
          보여드릴게요
        </section>
        <section ref={circleBackground} id={styles.firstSection}></section>
      </article>
    </div>
  );
};

export default Home;
