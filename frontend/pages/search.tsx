import React, {useState} from 'react';
import {GetServerSideProps} from 'next';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import {FcSearch} from 'react-icons/fc';
import SearchBackground from '../components/SearchComponents/SearchBackground';

const DynamicComponent = dynamic(() =>
  import('../components/SearchComponents/SearchResult'), {
  loading: function loadingComponent() {
    return <p>...</p>;
  },
});

function Search({data}) {
  const [searchString, setSearchString] = useState('');
  const router = useRouter();
  function handleInputChange(event) {
    setSearchString(event.target.value);
  }

  const handleData = () => {
    if (searchString === '') {
      router.push(`/search?date=2019`);
    } else {
      router.push(`/search?date=${searchString}`);
    }
  };
  return (
    <div>
      <SearchBackground />
      {/* <span style={{border: '1px solid #DDD;'}}>
        <FcSearch onClick={handleData}>Test</FcSearch>
        <input style={{border: 'none'}} onChange={handleInputChange}></input>
      </span>  */}
      {/* <DynamicComponent data={data} /> */}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const param = context.query.date ?? '2019';
  // const check1 = await fetch(
  //     `http://apis.data.go.kr/B552061/lgStat/getRestLgStat?ServiceKey=1%2FEJ91e6fCvfjNcZwzIFg2MPmpgqoBzdVaySj2RcGHIQQhjC3zMYLETRi1EtZZt6mDeVr%2F1MnM0PcIkelqZEDA%3D%3D&searchYearCd=${param}&siDo=1100&guGun=1116&numOfRows=13&pageNo=1&type=json`,
  // );
  // const data = await check1.json();
  // // console.log(data);

  // return {props: {data: [...data.items.item]}};
  return {
    props: {
      data: []
    }
  }
};

export default Search;