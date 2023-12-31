import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-scroll'; // Import Link from react-scroll
import styled from 'styled-components'; // Import styled-components
import RowImage from '../../Components/RowImage';
import Loading from '../../Components/Loading';

const Movie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const postData = {
      button_text: '영화',
    };

    axios.post('http://localhost:8000/api/main/process_button_click/', postData)
    .then(response =>  {
      try {
        // Check if response.data.data is defined and is a string
        if (response.data && typeof response.data === 'string') {
          // Clean the JSON string by replacing NaN with null
          const cleanedData = response.data.replace(/: NaN,/g, ': null,');
          
          // Parse the cleaned JSON string
          const parsedData = JSON.parse(cleanedData);
          console.log(parsedData.data)

          setData(parsedData.data);
          console.log(parsedData);

        } else {
          console.error('Error: response.data.data is not a string or is undefined.');
          setData([]); // Set data to an empty array
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setData([]); // Set data to an empty array
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setData([]); // Set data to an empty array
    });
}, []);

  const movieRef = useRef(null);

  if (!data || data.length === 0) {
    return <Loading />
  }

  const uniqueCleanAssetNames = new Set();

  const uniqueData = data.filter(program => {
    const cleanAssetNm = program.clean_asset_nm;
    if (!uniqueCleanAssetNames.has(cleanAssetNm)) {
      uniqueCleanAssetNames.add(cleanAssetNm);
      return true;
    }
    return false;
  });

  const groupedData = uniqueData.reduce((acc, program) => {
    const categoryL = program.category_l2;

    if (!acc[categoryL]) {
      acc[categoryL] = [];
    }

    acc[categoryL].push(program);
    return acc;
  }, {});


  return (
    <MovieContainer ref={movieRef}>
      <h1>영화</h1>
      {/* 동적으로 버튼 생성 */}
      <ButtonContainer>
      {Object.keys(groupedData).map(categoryL => (
        <Link key={categoryL} to={categoryL} smooth duration={500} offset={-movieRef.current?.offsetTop || 0}>
          <CategoryButton>#{categoryL}</CategoryButton>
        </Link>
      ))}
      </ButtonContainer>
      {Object.entries(groupedData).map(([categoryL, programs]) => (
        <div key={categoryL} id={categoryL}>
          <h1>{categoryL}</h1>
          {/* RowImage 컴포넌트를 사용 */}
          <RowImage data={programs.slice(0, 30)} />
        </div>
      ))}
    </MovieContainer>
  );
};

export default Movie;



const MovieContainer = styled.div`
  background-color: black; 
  color: white;
  padding: 20px; 
`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 800px;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 20px; /* 수정된 부분 */
`;

const CategoryButton = styled.button`
  margin: 5px;
  cursor: pointer;
  background-color: #ED174D; 
  color: white;
  border: none;
  padding: 0.9em 1.3em;
  border-radius: 20px; /* 조절 가능한 값 */
`;
