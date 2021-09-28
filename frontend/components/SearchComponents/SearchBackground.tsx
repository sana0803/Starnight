import styles from '../../styles/Search.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import logo from '../../images/logo.png';
import Image from 'next/image';
import {useRouter} from 'next/router';
const SearchBackground = () => {
  
  const router = useRouter();

  const moveHome = () => {

    router.push(`/`);
    
  };
    return (
      <div id={styles.background}>
        
        <div id={styles.searchBoxLine}>

          <div id={styles.logoImgBox} onClick={moveHome}>
            <Image src={logo} alt="logo"/>
          </div>

          <div id={styles.searchBox}>
            <input id={styles.searchInput}></input>
            <AiOutlineSearch id={styles.inputInsideIcon}/>
          </div>
          <div id={styles.homeContainer}>

          </div>
        </div>

        <div id={styles.mentions_analysis}>
          <div id={ styles.mentions_analysis_title}>언급량 분석</div>
          <div id={ styles.mentions_analysis_first_line }>

            <div id={styles.mentions_analysis_first_box_1}>PC 검색량</div>
            <div id={styles.mentions_analysis_first_box_2}>모바일 검색량</div>
            <div id={styles.mentions_analysis_first_box_3}>최초 언급 시기</div>

          </div>
          <div id={styles.mentions_analysis_second_line }>
            <div id={styles.mentions_analysis_second_box_1}>
              <div id={styles.mentions_analysis_second_box_1_title}>연관 검색어</div>
              <div></div>
            </div>
            <div id={styles.mentions_analysis_second_box_2}>
              <div id={styles.mentions_analysis_second_box_2_title}>SNS 언급량 추이</div>
              <div></div>
            </div>
            <div id={styles.mentions_analysis_second_box_3}>
              <div id={styles.mentions_analysis_second_box_3_title}>트렌디 지수</div>
              <div></div>
            </div>
          </div>

          <div id={styles.mentions_analysis_third_line }>
            <div id={styles.mentions_analysis_third_box_1}>
              <div id={styles.mentions_analysis_third_box_1_title}>트렌디 지수</div>
              <div></div>
            </div>
            <div id={styles.mentions_analysis_third_box_2}>
              <div id={styles.mentions_analysis_third_box_2_title}>검색량 추이</div>
              <div></div>
            </div>
          </div>
        </div>

      </div>
    );
  };
  
  export default SearchBackground;
  