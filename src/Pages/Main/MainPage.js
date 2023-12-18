import React, { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import TimeRowImage from '../../Components/TimeRowImage';
import RowImage from '../../Components/RowImage';
import ADBanner from '../../Components/ADBanner';
import Loading from '../../Components/Loading';
import styled from 'styled-components';

const MainPage = () => {
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  const [recommendations3, setRecommendations3] = useState([]);
  const [recommendations4, setRecommendations4] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [currentTime, setCurrentTime] = useState('');

  

   // Fetching data for Recommendations1 with optional hashtag
  const fetchRecommendations1 = (hashtagValue = null) => {
    const subsr = localStorage.getItem('subsr');

    if (!subsr) {
      console.error('subsr is missing');
      return;
    }

    const postData = {
      subsr: subsr,
      hashtag: hashtagValue, 
    };

    // Fetching data for Recommendations1
    fetch('https://main.jinttoteam.com/api/main/recommendation_1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
      credentials: 'include',
    })
      .then(response => {
        console.log('Response received:!!!!', response); // 응답 로깅
        console.log('hashtag', postData['hashtag'])
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        if (data?.data) {
          setRecommendations1(data.data);
        } else {
          console.error('Data for Recommendations1 is undefined or null');
        }
      })
      .catch(error => {
        console.error('Error fetching data for Recommendations1:', error);
      });

   };

   useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`);
    };

    // 컴포넌트가 마운트될 때 현재 시간 업데이트
    updateCurrentTime();

    // 1분마다 현재 시간 업데이트
    const intervalId = setInterval(updateCurrentTime, 60000);

    // 컴포넌트 언마운트 시 clearInterval
    return () => clearInterval(intervalId);
  }, []); // 빈 배열은 한 번만 실행

  useEffect(() => {
    const subsr = localStorage.getItem('subsr');

    if (!subsr) {
      console.error('subsr is missing');
      return;
    }

    const postData = {
      subsr: subsr,
    };

    fetchRecommendations1();

    // Fetching data for Recommendations2
    fetch('https://main.jinttoteam.com/api/main/recommendation_2/', {
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
    fetch('https://main.jinttoteam.com/api/main/recommendation_3/', {
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
    fetch('https://main.jinttoteam.com/api/main/recommendation_4/', {
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

    // 해시태그 버튼 클릭 핸들러
   // 해시태그 버튼 클릭 핸들러
  const handleHashtagClick = (hashtagValue) => {
       // 해시태그 버튼 클릭 핸들러
    console.log(`Clicked hashtag:`, hashtagValue);
    fetchRecommendations1(hashtagValue); // 클릭된 해시태그로 데이터 재요청
    setSelectedButton(hashtagValue);
    
   };

  if (!recommendations1 || recommendations1.length === 0) {
    return <Loading />
  }
  if (!recommendations2 || recommendations2.length === 0) {
    return <Loading />
  }
  if (!recommendations3 || recommendations3.length === 0) {
    return <Loading />
  }
  if (!recommendations4 || recommendations4.length === 0) {
    return <Loading />
  }

  return (
      <div style={{ background: 'black', color: 'white', padding: '20px' }}>
        <h1 style={{ color: 'white' }}>MD가 <span style={{ color: '#ED174D' }}>Pick</span>한 프로그램들!</h1>

        <div>
         <ButtonContainer>
            {[1, 2, 3, 4].map((num) => (
              <Button key={num} onClick={() => handleHashtagClick(num)}  isSelected={selectedButton === num}>
                #{num === 1 ? '시간대별' : num === 2 ? '평일' : num === 3 ? '주말' : num === 4 ? '불금' : ''}
              </Button>
            ))}
         </ButtonContainer>
         <p style={{ fontWeight: 'bold', fontSize: '25px', marginTop: '10px' }}>
              현재 시간, {currentTime}
         </p>
        </div>
        <div style={{ background: "rgba(169, 169, 169, 0.15)", padding: '10px', height: '500px'}}>
            {/* 왼쪽 반 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '0px 20px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '25px', marginBottom: '10px', marginTop: '30px'}}>
              {selectedButton === 1
                ? '이 시간대에 사람들이 많이 봤어요!'
                : selectedButton === 2
                ? '일하고 나서 쉬는 동안 이런 프로그램 어떠신가요?'
                : selectedButton === 3
                ? '아늑한 주말에는 이런 프로그램 어떠신가요?'
                : selectedButton === 4
                ? '불타는 금요일엔 이런 프로그램 어떠신가요?'
                : ''}
            </p>
          </div>
  
          {/* 오른쪽 반 */}
          <div style={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px', flex:1, overflow:'hidden'}}>
            {recommendations1.length > 0 ? (
                  <TimeRowImage data={recommendations1.slice(0, 5)} />
            ) : (
              <div style={{ background: 'lightgray', padding: '10px', height: '100%'}}>
                No Recommendations4 available.
              </div>
            )}
          </div>
        </div>

      <ADBanner />
      <div style={{ marginTop: '25px' }}>
        <h2 style={{ marginBottom: '5px' }}>🤗 AI가 추천해주는 프로그램이에요 🤗</h2>
        {recommendations3.length > 0 ? (
              <RowImage data={recommendations3.slice(0, 20)} />
        ) : (
          <div style={{ background: 'lightgray', padding: '10px' }}>
            No Recommendations4 available.
          </div>
        )}
      </div>

      <h2 style={{ marginBottom: '5px' }}>❤️ 가장 최근 본 작품과 비슷한 작품들이에요! ❤️</h2>
      {recommendations4.length > 0 ? (
            <RowImage data={recommendations4.slice(0, 20)} />
      ) : (
        <div style={{ background: 'lightgray', padding: '10px' }}>
          No Recommendations4 available.
        </div>
      )}
      
        <h2 style={{ marginBottom: '5px' }}>🦔 가장 선호하는 장르 추천해드려요! 🦔</h2>
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

const Button = styled.button`
  margin: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#ED174D' : 'black')}; 
  border: 2px solid #ED174D;
  color: white;
  padding: 0.9em 1.3em;
  border-radius: 20px;

  &:active {
    background-color: #ED174D;
  }

`;

const ButtonContainer = styled.div`
  display: flex;
  max-width: 800px;
  flex-wrap: wrap;
  gap: 2px;
  margin-left: -10px;
  margin-top: 20px;
  margin-bottom: 20px; /* 수정된 부분 */
`;


export default MainPage;







