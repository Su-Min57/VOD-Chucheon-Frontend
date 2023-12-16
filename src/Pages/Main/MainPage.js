import React, { useState, useEffect } from 'react';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Row from '../../Components/Row';
import RowImage from '../../Components/RowImage';
import ADBanner from '../../Components/ADBanner';
import Loading from '../../Components/Loading';

const MainPage = () => {
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  const [recommendations3, setRecommendations3] = useState([]);
  const [recommendations4, setRecommendations4] = useState([]);

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
     
    // http://localhost:8000/  
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

          // Fetching data for Recommendations4
    fetch('http://localhost:8000/api/main/recommendation_3/', {
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
          setRecommendations3(data.data);
        } else {
          console.error('Data for Recommendation3 is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error fetching data for Recommendations3:', error);
      });


        // Fetching data for Recommendations4
    fetch('http://localhost:8000/api/main/recommendation_4/', {
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
          setRecommendations4(data.data);
        } else {
          console.error('Data for Recommendations2 is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error fetching data for Recommendations2:', error);
      });
  }, []);

  if (recommendations1.length === 0) {
    return <Loading />
  }

  return (
    <div style={{ background: 'black', color: 'white', padding: '20px' }}>
      <h2>🔥 지금 시간대에 HOT한 프로그램이에요! 🔥</h2>
      <div style={{ background: "rgba(169, 169, 169, 0.15)", padding: '10px', height: '500px'}}>
        {recommendations1.length > 0 ? (
          <Row data={recommendations1.slice(0, 20)} />
        ) : (
          <div style={{ background: 'lightgray', padding: '10px' }}>
            No Recommendations1 available.
          </div>
        )}
      </div>
      
      <h2>🦔 가장 선호하는 장르 추천해드려요! 🦔</h2>
      {recommendations2.length > 0 ? (
        <RowImage data={recommendations2.slice(0, 20)} />
      ) : (
        <div style={{ background: 'lightgray', padding: '10px' }}>
          No Recommendations2 available.
        </div>
      )}

      <h2>🤗 AI가 추천해주는 프로그램이에요 🤗</h2>
      {recommendations3.length > 0 ? (
            <RowImage data={recommendations3.slice(0, 20)} />
      ) : (
        <div style={{ background: 'lightgray', padding: '10px' }}>
          No Recommendations4 available.
        </div>
      )}

      <h2>❤️ 가장 최근 본 작품과 비슷한 작품들이에요! ❤️</h2>
      {recommendations4.length > 0 ? (
            <RowImage data={recommendations4.slice(0, 20)} />
      ) : (
        <div style={{ background: 'lightgray', padding: '10px' }}>
          No Recommendations4 available.
        </div>
      )}

      <h2>🍊🍋제철장터 광고🍇🍓</h2>
      <ADBanner />

    </div>
  );
};

export default MainPage;
