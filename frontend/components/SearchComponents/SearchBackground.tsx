import styles from '../../styles/Search.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import logo from '../../images/logo.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable'
import React from 'react';
import GraphComponent from './GraphComponent';

const fetcher = url => fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
}).then(async res => {
  //console.log(res.json())
  let data = await res.json();
  return data;
})

const SearchBackground = () => {

  const router = useRouter();
  let paramData: string | undefined | string[] = '';
  if (router.query) {
    paramData = router.query.word;
  }
  else {
    paramData = '소고기';
  }
  //console.log(paramData);

  const [searchText, setSearchText] = React.useState(paramData);
  const textInput = React.useRef<any>();

  const { data, error } = useSWRImmutable(`http://localhost:3000/search/${searchText}`, fetcher);


  //console.log(data)
  let keywordList: null | any[]  = null, ratios: null | any[] = null , rank = null, graphData : null | any[] | undefined = null;
  if (data) {
    keywordList = data?.keywordList;
    ratios = data?.ratios;
    graphData = ratios?.map((ratio, index) => {
      return ({
          name: `${(index+1)}월`,
          ratio: Math.ceil(ratio),
        });
    });
    rank = data?.rank;
  }

 //console.log(keywordList, ratios)

  const submitInput = () => {
    //console.log(textInput.current.value)
    setSearchText(textInput.current.value.replace(/ /g,"").trim());
  }

  const goEnter = (e) => {
    if (e.key === 'Enter') {
      submitInput();
    }
  }

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
            <input id={styles.searchInput} ref={textInput} maxLength={10} onKeyPress={goEnter}></input>
            <AiOutlineSearch id={styles.inputInsideIcon} onClick={submitInput}/>
          </div>
          <div id={styles.homeContainer}>

          </div>
        </div>

        <div id={styles.mentions_analysis}>
          <div id={ styles.mentions_analysis_title}>언급량 분석</div>
          <div id={ styles.mentions_analysis_first_line }>

            <div id={styles.mentions_analysis_first_box_1}>
              <div className={styles.first_line_titles}>PC 검색량</div>
              <div>{ keywordList && keywordList[0].monthlyPcQcCnt }</div>
            </div>
            <div id={styles.mentions_analysis_first_box_2}>
              <div className={styles.first_line_titles}>모바일 검색량</div>
              <div>{ keywordList && keywordList[0].monthlyMobileQcCnt }</div>
            </div>
            <div id={styles.mentions_analysis_first_box_3}>
              <div className={styles.first_line_titles}>키워드 경쟁력 지수</div>
              <div>{ rank && rank }</div>
            </div>

          </div>
          <div id={styles.mentions_analysis_second_line }>
            <div id={styles.mentions_analysis_second_box_1}>
              <div id={styles.mentions_analysis_second_box_1_title}>
                <div>연관 검색어</div>
              </div>
              <div className={styles.mentions_analysis_second_box_1_dataBox}>
                  {keywordList &&
                    keywordList.map(({ relKeyword }, index ) => {
                      return <div key={index} className
                        ={styles.mentions_analysis_second_box_1_data}>{relKeyword}</div>
                    })
                  }
                </div>
              
            </div>
            <div id={styles.mentions_analysis_second_box_2}>
              <div id={styles.mentions_analysis_second_box_2_title}>
                연관 검색어 노출 횟수</div>
                <div className={styles.mentions_analysis_second_box_2_dataBox}>
                {keywordList &&
                    keywordList.map(({ relKeyword, monthlyPcQcCnt, monthlyMobileQcCnt,
                      monthlyAvePcClkCnt, monthlyAveMobileClkCnt, monthlyAvePcCtr,
                      monthlyAveMobileCtr, plAvgDepth
                    }, index) => {
                      return <div key={ index } className
                        ={styles.mentions_analysis_second_box_2_data}>
                        {relKeyword} / {monthlyPcQcCnt} / {monthlyMobileQcCnt} / { plAvgDepth}
                      </div>
                  })
                }
                </div>
              
              
            </div>
            <div id={styles.mentions_analysis_second_box_3}>
                
                <div id={styles.mentions_analysis_second_box_3_title}>
                  클릭 수
                </div>
                <div className
                    ={styles.mentions_analysis_second_box_3_dataBox}>
                  <div>PC 클릭 수</div>
                  <div>{ keywordList && keywordList[0].monthlyAvePcCtr }</div>
                </div>
                <div className
                    ={styles.mentions_analysis_second_box_3_dataBox}>
                  <div>모바일 클릭 수</div>
                  <div>{ keywordList && keywordList[0].monthlyAveMobileCtr }</div>
                </div>
                
                <div id={styles.mentions_analysis_second_box_3_2_title}>
                 플랫폼 언급량
                </div>
                <div className
                    ={styles.mentions_analysis_second_box_3_2_dataBox}>
                  <div>트위터 단어 언급량</div>
                  <div>{ data && data.mention }</div>
                </div>
              
              
            </div>
          </div>

          <div id={styles.mentions_analysis_third_line }>
            <div id={styles.mentions_analysis_third_box_1}>
              <div id={styles.mentions_analysis_third_box_1_title} >
                트렌디 지수</div>
                
              <div className={styles.mentions_analysis_third_box_1_dataBox}>
                {keywordList && keywordList[0].compIdx}
              </div>
              
              
            </div>
            <div id={styles.mentions_analysis_third_box_2}>
              <div id={styles.mentions_analysis_third_box_2_title}>
                검색량 추이 (단위:{  data &&  data.timeUnit }) </div>
                
                <GraphComponent data={graphData}
                  styles={{
                    width: "100%",
                    height: "80%"
                  }}
                />
                {/* <div className={styles.mentions_analysis_third_box_2_dataBox}>{
                  ratios && 
                  ratios.map((ratio, index) => {
                    return (<div key={index} className
                      ={styles.mentions_analysis_third_box_2_data}>
                        <div>{index + 1}월</div>
                        <div>{Math.ceil(ratio)}%</div>
                      </div>
                    )
                  })
              }
                </div> */}
              
            </div>
          </div>
        </div>

      </div>
    );
  };
  
  export default SearchBackground;
