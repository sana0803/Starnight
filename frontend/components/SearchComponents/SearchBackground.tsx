import styles from '../../styles/Search.module.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import logo from '../../images/logo.png';
// import pcIcon from '../../images/pc.svg';
// import mobileIcon from '../../images/mobile.svg';
// import graphIcon from '../../images/graph.svg';
import twitterIcon from '../../images/twitter.png';
import PcIcon from '../../images/pc.svg';
import MobileIcon from '../../images/mobile.svg';
import GraphIcon from '../../images/graph.svg';
import TwitterIcon from '../../images/twitter_orig.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useSWRImmutable from 'swr/immutable'
import React from 'react';
import GraphComponent from './GraphComponent';
import MiddlePieGraph from './MiddlePieGraph';
import { AiOutlineQuestionCircle } from "react-icons/ai";
import ReactHover, { Trigger, Hover } from "react-hover";
import ResultManual from './ResultManual';

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

const optionsCursorTrueWithMargin = {
  followCursor: true,
  shiftX: 20,
  shiftY: 0
};


const SearchBackground = () => {

  const router = useRouter();
  let paramData: string | undefined | string[] = '';
  if (router.query) {

    if (router.query.word === '') {
      paramData = '한복'
    }
    else {
      paramData = router.query.word;
    }
  }
  else {
    paramData = '소고기';
  }
  //console.log(paramData);

  const [searchText, setSearchText] = React.useState(paramData);
  const textInput = React.useRef<any>();

  // const { data, error } = useSWRImmutable(`/search/${searchText}`, fetcher);
  const { data, error } = useSWRImmutable(`http://localhost:3000/search/${searchText}`, fetcher);
  // const { data, error } = useSWRImmutable(`https://j5b103.p.ssafy.io/api/word/search?word=${searchText}`, fetcher);

  //console.log(data)
  let keywordList: null | any[]  = null, ratios: null | any[] = null , rank: null | string | number = null, graphData : null | any[] | undefined = null;
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

    if (rank && !(rank+'').includes('.')) {
      rank = (rank+'').concat('.0');
    }
  }

 //console.log(keywordList, ratios)

  const submitInput = () => {
    //console.log(textInput.current.value)
    setSearchText(textInput.current.value.replace(/ /g, "").trim());
    textInput.current.value = '';
  }

  const goEnter = (e) => {
    if (e.key === 'Enter') {
      submitInput();
    }
  }
  const goSearch = (value) => {
    console.log(value)
    setSearchText(value.replace(/ /g, "").trim());
    textInput.current.value = '';
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
          <div id={styles.mentions_analysis_title}>키워드 분석
          </div>
          <div id={ styles.mentions_analysis_first_line }>
            <div id={styles.mentions_analysis_first_box_1}>
              <div className={styles.first_box_wrap}>
                <div id={styles.yellowBox}>
                  <div className={styles.icon_img}>
                    {/* <Image src={pcIcon} alt="pc" /> */}
                    <PcIcon />
                  </div>
                </div>
                <div className={styles.first_line_titles}>월간 PC 검색량</div>
                <div>
                  { keywordList && keywordList[0].monthlyPcQcCnt }
                </div>
              </div>
            </div>
            <div id={styles.mentions_analysis_first_box_2}>
              <div className={styles.first_box_wrap}>
                <div id={styles.yellowBox}>
                  <div className={styles.icon_img}>
                    {/* <Image src={mobileIcon} alt="mobile" /> */}
                    <MobileIcon />
                  </div>
                </div>
                <div className={styles.first_line_titles}>월간 모바일 검색량</div>
                <div>
                { keywordList && keywordList[0].monthlyMobileQcCnt }
                </div>
              </div>
            </div>
            <div id={styles.mentions_analysis_first_box_3}>
              <div className={styles.first_box_wrap}>
                <div id={styles.yellowBox}>
                  <div className={styles.icon_img}>
                    {/* <Image src={graphIcon} alt="graph" /> */}
                    <GraphIcon />
                  </div>         
                </div>
                <div className={styles.first_line_titles}>키워드 경쟁력</div>
                <div>
                  { rank && rank }
                </div>
                <span className={styles.first_box_3_txt_1}> / 5.0 </span>
                <span className={styles.first_box_3_txt_2}>
                  ({ keywordList && keywordList[0].compIdx })
                </span>                
              </div>
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
                        ={styles.mentions_analysis_second_box_1_data}
                        onClick={()=>goSearch(relKeyword)}
                      ># {relKeyword}</div>
                    })
                  }
                </div>
              
            </div>
            <div id={styles.mentions_analysis_second_box_2}>
              <div id={styles.mentions_analysis_second_box_2_title}>
                연관 검색어 노출 횟수</div>
                <div className={styles.mentions_analysis_second_box_2_dataBox}>
                {keywordList ?
                   <MiddlePieGraph data={
                        keywordList
                      } />
                   :
                  <></>
                }
                </div>
              
              
            </div>
            <div id={styles.mentions_analysis_second_box_3}>                
                <div id={styles.mentions_analysis_second_box_3_title}>
                월간 클릭률
                <ReactHover options={optionsCursorTrueWithMargin}>
                <Trigger type="trigger">
                <AiOutlineQuestionCircle className={styles.questionIcon}/>
                  {/* <TriggerComponent /> */}
                </Trigger>
                <Hover type="hover">
                  <ResultManual />
                </Hover>
              </ReactHover>
                </div>
                <div className
                    ={styles.mentions_analysis_second_box_3_dataBox}>
                  <div className={styles.second_box_wrap}>
                    {/* <div><Image src={pcIcon} alt="pc" /></div> */}
                    <div><PcIcon /></div>
                    <div>
                      <div>PC 클릭률</div>
                      <span>{ keywordList && keywordList[0].monthlyAvePcCtr } %</span>
                    </div>
                  </div>
                </div>
                <div className
                    ={styles.mentions_analysis_second_box_3_dataBox}>
                  <div className={styles.second_box_wrap}>
                    {/* <div><Image src={mobileIcon} alt="mobile" /></div> */}
                    <div><MobileIcon /></div>
                    <div>
                      <div>모바일 클릭률</div>
                      <span>{ keywordList && keywordList[0].monthlyAveMobileCtr } %</span>
                    </div>
                  </div>
                </div>
                
                <div id={styles.mentions_analysis_second_box_3_2_title}>
                플랫폼 언급량
                <AiOutlineQuestionCircle className={styles.questionIcon}/>
                </div>
                <div className
                    ={styles.mentions_analysis_second_box_3_2_dataBox}>
                  <div className={styles.second_box_wrap}>
                    <div><Image src={twitterIcon} alt="twitter" /></div>
                    <div>
                      <div>트위터 내 언급량</div>
                      <span>{ data && data.mention }</span>
                    </div>
                  </div>
                </div>                            
            </div>
          </div>

          <div id={styles.mentions_analysis_third_line }>
            <div id={styles.mentions_analysis_third_box_1}>
              <div id={styles.mentions_analysis_third_box_1_title} >
                트윗 미리보기
              </div>
                
              <div className={styles.mentions_analysis_third_box_1_dataBox}>
              {data &&
                data.twit.map((twit, index ) => {
                  return (<div key={index} className ={styles.twit_wrap}>
                    <div className={styles.twit_icon}>
                      <TwitterIcon />
                    </div>
                    <div className={styles.twit_box}>
                      { twit.split("Quote Tweet")}
                    </div>
                  </div>
                  )                    
                })
              }
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
