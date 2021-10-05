import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useSWR from 'swr';
import styles from '../../styles/MainBody.module.scss';

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

    const { data, error } = useSWR(`http://localhost:3000/mention`, fetcher);
 
    const textInput = React.useRef<any>();

    const submitInput = () => {
        

    }
    let datas = ['소고기'];

    datas = datas.map((e)=> '#'+e);

    console.log(data);

    return (
        <>
            <div id={styles.searchBox}>
                <input id={styles.searchInput} ref={textInput}
                    placeholder="이 곳을 눌러 키워드 분석을 시작해보세요."
                ></input>
                <AiOutlineSearch id={styles.inputInsideIcon} onClick={submitInput}/>
            </div>

            <div id={styles.keyWordList}>
                {datas.map((e,index) => {
                    return <p key={index}>{e}</p>
                })}
            </div>
        </>
    );
}

export default MainBody;