import type { NextPage } from "next";
import React, { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import Image from 'next/image';
// import styles from "../styles/Home.module.css";
import styles from "../styles/Index.module.scss";
import MainPage from "../components/MainComponents/MainPage";
// import { useSpring, animated } from 'react-spring';

const Home: NextPage = () => {
  const mainText = useRef<any>();
  const circleBackground = useRef<any>();

  // const circleData = useSpring({
  //   to: { borderRadius: '0%' }, from: {
  //     borderRadius: '50%'
  //   }
  // });
  const [isLastScroll, setIsLastScroll] = useState(false);

  useEffect(() => {

    function handleScroll() {
      const scrollTop = window.scrollY;
      const isEndOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
      console.log(scrollTop, isEndOfPage);
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
      
      if (isEndOfPage) {
        setIsLastScroll(true);
      }
      else {
        setIsLastScroll(false);
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
        <section ref={circleBackground} id={styles.firstSection}>
          {isLastScroll ? <MainPage /> : <></>}
        </section>
      </article>
    </div>
  );
};

export default Home;
