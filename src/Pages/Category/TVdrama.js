import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components'; // Import styled-components
import RowImage from '../../Components/RowImage';

const TVdrama = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const postData = {
      button_text: 'TV드라마',
    };

    axios.post('http://localhost:8000/api/main/process_button_click/', postData)
      .then(response => {
        setData(response.data.data);
        console.log(response.data.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
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

  const groupedData = data.reduce((acc, program) => {
    const categoryL = program.category_l;

    if (!acc[categoryL]) {
      acc[categoryL] = [];
    }

    acc[categoryL].push(program);
    return acc;
  }, {});

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  return (
    <TVdramaContainer>
      <h1>TV드라마</h1>
      {Object.entries(groupedData).map(([categoryL, programs]) => (
        <div key={categoryL}>
          <h2>{categoryL}</h2>
          {/* RowImage 컴포넌트를 사용 */}
          <RowImage data={programs.slice(0, 30)} />
        </div>
      ))}
    </TVdramaContainer>
  );
};

const TVdramaContainer = styled.div`
  background-color: black; /* Set the background color to black */
  color: white; /* Set text color to white */
  padding: 20px; /* Add some padding for better readability */
`;

export default TVdrama;
