import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Row from '../../Components/Row';
import RowImage from '../../Components/RowImage';

const MainPage = () => {
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);

  useEffect(() => {
    const subsr = localStorage.getItem('subsr');

    if (!subsr) {
      console.error('subsr is missing');
      return;
    }

    const postData = {
      subsr: subsr,
    };

    // Fetching data for Recommendations1
    fetch('http://localhost:8000/api/main/recommendation_1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data?.data) {
          setRecommendations1(data.data);
        } else {
          console.error('Data for Recommendations1 is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error fetching data for Recommendations1:', error);
      });

    // Fetching data for Recommendations2
    fetch('http://localhost:8000/api/main/recommendation_2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data?.data) {
          setRecommendations2(data.data);
        } else {
          console.error('Data for Recommendations2 is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error fetching data for Recommendations2:', error);
      });
  }, []);


  return (
    <div style={{ background: 'black', color: 'white', padding: '20px' }}>
      <h2>🔥 시간별 추천 🔥</h2>
      <div style={{ background: "rgba(169, 169, 169, 0.15)", padding: '10px', height: '500px'}}>
        {recommendations1.length > 0 ? (
          <Row data={recommendations1.slice(0, 20)} />
        ) : (
          <div style={{ background: 'lightgray', padding: '10px' }}>
            No Recommendations1 available.
          </div>
        )}
      </div>

      <h2>🔥 가장 선호하는 장르 추천해드려요 🔥</h2>
      {recommendations2.length > 0 ? (
        <RowImage data={recommendations2.slice(0, 20)} />
      ) : (
        <div style={{ background: 'lightgray', padding: '10px' }}>
          No Recommendations2 available.
        </div>
      )}
    </div>
  );
};

export default MainPage;









/* 수빈 작업
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 3000, // 슬라이드 간 시간 간격 (밀리초 단위)
  };

  const manualSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
  };



  return (
      <div style={{ background: 'black', color: 'white', padding: '20px' }}>
        {recommendations1.length > 0 ? (
          <div style={{ background: 'rgba(169, 169, 169, 0.15)', padding: '10px', height: '500px'}}>
            <Slider {...sliderSettings}>
              {recommendations1.slice(0, 20).map((program, index) => (
                <div key={index}>
                  <RowforReal data={[program]} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div style={{ background: 'lightgray', padding: '10px' }}>
              추천 프로그램이 없습니다.
          </div>
        )}


          <h2>가장 선호하는 장르 추천해드려요 🔥</h2>
          {recommendations2.length > 0 ? (
            <Slider {...manualSliderSettings}>
              {Array.from({ length: Math.ceil(recommendations2.length / 5) }).map((_, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
                  {/* 각 슬라이드에 5개의 이미지 표시 */
                  /*
                  {recommendations2.slice(index * 5, (index + 1) * 5).map((program, programIndex) => (
                    <div key={programIndex} style={{ margin: '5px', flex: '0 0 auto' }}>
                      <img
                        src={program.image}
                        alt={program.asset_nm}
                        style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </Slider>
          ) : (
            <div style={{ background: 'lightgray', padding: '10px' }}>
              추천 프로그램이 없습니다.
            </div>
          )}
      
        
        
        <h2>가장 선호하는 장르 추천해드려요 🔥</h2>
      </div>
    );
  };

export default MainPage;
*/