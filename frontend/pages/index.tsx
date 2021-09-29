import type { NextPage } from "next";
import React, { useEffect, useRef } from "react";
import Head from 'next/head';
import Image from 'next/image';
// import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.scss";
// import { useSpring, animated } from 'react-spring';

const Home: NextPage = () => {
  const mainText = useRef(null);
  const circleBackground = useRef(null);

  // const circleData = useSpring({
  //   to: { borderRadius: '0%' }, from: {
  //     borderRadius: '50%'
  //   }
  // });

  useEffect(() => {

    function handleScroll() {
      const scrollTop = window.scrollY;
      console.log(scrollTop);
      // if (scrollTop >= 1080) {

      // }
      circleBackground.current.style.width = `${830+ 2* scrollTop}px`;
      circleBackground.current.style.height = `${830 + 2* scrollTop}px`;
      
      if (545 - scrollTop > 0) {
        
        circleBackground.current.style.marginLeft = `${545 - scrollTop}px`;
        circleBackground.current.style.borderRadius = `50%`;
        circleBackground.current.style.marginTop = `${1000 + (scrollTop/3)}px`;
        
      }
      else if((545 - scrollTop <= 0)){
        circleBackground.current.style.marginLeft = `0px`;
        circleBackground.current.style.borderRadius = `0%`;
      }
      
      if (scrollTop <= 790) {
        mainText.current.style.color = "white";
      }
      else {
        mainText.current.style.color = "#FFD523";
      }

      
      
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
        <section id={styles.mainText} ref={mainText}>
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
