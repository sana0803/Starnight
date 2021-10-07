import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
// import useSWR from 'swr';
import styles from '../../styles/MainBody.module.scss';
import useSWRImmutable from 'swr/immutable'
import { useRouter } from 'next/router';
import MainGraph from './MainGraph';
import { GiRank3 } from "react-icons/gi";
import { FaFileWord } from "react-icons/fa";
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

const MainBody = () => {

    const { data, error } = useSWRImmutable(`http://localhost:3000/mention`, fetcher);
    // const { data, error } = useSWRImmutable(`https://j5b103.p.ssafy.io/api/word/trend`, fetcher);
 
    const textInput = React.useRef<any>();
    const router = useRouter();

    const submitInput = () => {
        router.push({
            pathname: '/search',
            query: { word: textInput.current.value.replace(/ /g,"").trim()}
        });
    }
    let datas: null | any[] = null;

    if (data) {
        datas = data?.keywords;
        console.log(data.keywords)
    }
    
    const goEnter = (e) => {
        if (e.key === 'Enter') {
            submitInput();
        }
    }

    const getNews = (e) => {
       
        router.push({
            pathname: '/search',
            query: { word: e.title.replace(/ /g,"").trim()}
        });
        // window.open(e.news_url, e.news_title,
        //     "resizable,scrollbars,status"
        // );
    }
    return (
        <>
            <div id={styles.searchBox}>
                <input id={styles.searchInput} ref={textInput} maxLength={10}
                    placeholder="이 곳을 눌러 키워드 분석을 시작해보세요."
                    onKeyPress={goEnter}
                ></input>
                <AiOutlineSearch id={styles.inputInsideIcon} onClick={submitInput}/>
            </div>

            <div id={styles.keyWordList}>
                <div id={styles.keyWordListBox}>
                <div className={styles.rankBox}>
                                <FaFileWord className={styles.rankIcon}/>
                                <h2 className={styles.rankTitle}>TOP 20</h2>
                            </div>

                    <div id={styles.keyWordTopList}>
                        
                    { datas && datas.map((e,index) => {
                        return <div key={index} className={styles.dataKeyword}
                            onClick={()=>getNews(e)}
                        ># {`${e.title}`}</div>
                    })}
                    </div>
                </div>
                <div>
                    {data ?
                        <>
                            <div className={styles.rankBox}>
                                <GiRank3 className={styles.rankIcon}/>
                                <h2 className={styles.rankTitle}>검색어 순위</h2>
                            </div>
                            <MainGraph data={data.keywords} />
                        </>
                        :
                        <></>
                    
                    }
                </div>
            </div>
        </>
    );
}

export default MainBody;