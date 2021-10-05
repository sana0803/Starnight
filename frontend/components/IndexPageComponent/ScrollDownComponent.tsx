import React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import styles from '../../styles/ScrollDownComponent.module.scss';
import { useSpring, animated } from 'react-spring'

const ScrollDownComponent = () => {
    
    const animationStyles = useSpring({
        loop: true,
        to: [
          { opacity: 1, color: '#ffaaee' },
          { opacity: 0, color: 'rgb(14,26,19)' },
        ],
        from: { opacity: 0, color: 'red' },
      })


    return (
        <animated.div style={ animationStyles }>
            <div id={styles.scrollBox}>
                <div id={styles.scrollText}>Scroll Down</div>
                <AiOutlineArrowDown id={styles.arrowDown}/>
            </div>
        </animated.div>
    );

}

export default ScrollDownComponent;