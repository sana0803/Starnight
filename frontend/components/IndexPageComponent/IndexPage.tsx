import type { NextPage } from "next";
import React, { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import Image from 'next/image';
// import styles from "../styles/Home.module.css";
import styles from "../../styles/Index.module.scss";
import MainPage from "../MainComponents/MainPage";
import ScrollDownComponent from "./ScrollDownComponent";

const IndexPage: NextPage = () => {
  const mainText = useRef<any>();
  const circleBackground = useRef<any>();

  const [isLastScroll, setIsLastScroll] = useState(false);
  const [isScrollTop, setIsScrollTop] = useState(true);
  useEffect(() => {
  
    function handleScroll() {
      const scrollTop = window.scrollY;
      const isEndOfPage = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
      
      // window.resizeTo(
      //   1920, 1080
      // )
      
      // console.log(scrollTop, isEndOfPage, window.innerWidth,
      // window.innerHeight);
      // if (scrollTop >= 1080) {

      // }
      circleBackground.current.style.width = `${830+ 2* scrollTop}px`;
      circleBackground.current.style.height = `${830 + 2* scrollTop}px`;
      
      if (545 - scrollTop > 0) {
        
        circleBackground.current.style.marginLeft = `${545 - scrollTop}px`;
        circleBackground.current.style.borderRadius = `50%`;
        circleBackground.current.style.marginTop = `${110}vh`;
        
      }
      else if((545 - scrollTop <= 0)){
        circleBackground.current.style.marginLeft = `0px`;
        circleBackground.current.style.borderRadius = `0%`;
        // circleBackground.current.style.marginTop = `${0}px`;
      }``
      
      if (scrollTop <= 790) {
        mainText.current.style.color = "white";
      }
      else {
        mainText.current.style.color = "#FFD523";
      }
      
      if (isEndOfPage) {
        circleBackground.current.style.height = `1080px`;
        mainText.current.style.margin = "15vh 75vh 20vh";
        setIsLastScroll(true);
      }
      else {
        mainText.current.style.margin = "25vh 75vh";
        setIsLastScroll(false);
      }

      if (scrollTop === 0) {
        setIsScrollTop(true);
      }
      else {
        setIsScrollTop(false);
      }
      
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          {
          isScrollTop ?
              <ScrollDownComponent /> :
            <></>
        }
        </section>
        
        <section ref={circleBackground} id={styles.firstSection}>
          {isLastScroll ? <MainPage /> : <></>}
        </section>
      </article>
    </div>
  );
};

export default IndexPage;
