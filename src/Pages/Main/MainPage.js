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
  const fetchRecommendations1 = (hashtagValue) => {
    const subsr = localStorage.getItem('subsr');

    if (!subsr) {
      console.error('subsr is missing');
      return;
    }

    const postData_ = {
      subsr: subsr,
      hashtag: hashtagValue, 
    };
    
    console.log(postData_)

    // Fetching data for Recommendations1
    fetch('http://localhost:8000/api/main/recommendation_1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData_),
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
          console.log(data.data)
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

   const formatCurrentTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const parsedHours = parseInt(hours, 10);
  
    if (parsedHours >= 12) {
      return `PM ${parsedHours === 12 ? parsedHours : parsedHours - 12}:${minutes}`;
    } else {
      return `AM ${parsedHours === 0 ? '12' : parsedHours}:${minutes}`;
    }
  };

  const getCurrentHour = () => {
    const now = new Date();
    return now.getHours();
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
        <h1 style={{ color: 'white' }}>헬로Pick <span style={{ color: '#ED174D' }}>MD</span>의 숨겨진 추천 Playlist 🎧</h1>

         <ButtonContainer>
            {[1, 2, 3, 4].map((num) => (
              <Button key={num} onClick={() => handleHashtagClick(num)}  isSelected={selectedButton === num}>
                #{num === 1 ? ' 시간대🕛' : num === 2 ? ' 평일🍀' : num === 3 ? ' 주말🌟' : num === 4 ? ' 불금🔥' : ''}
              </Button>
            ))}
         </ButtonContainer>

         <Wrapper>
          <Description1>
              {selectedButton === 1 ? (
                <>
                  <TabbedDescription1>지금은 {formatCurrentTime(currentTime)}</TabbedDescription1>{' '}
                  <TabbedDescription1><span style={{ color: '#ED174D' }}>{getCurrentHour()}시</span> 인기 급상승 프로그램 </TabbedDescription1>
                  <TabbedDescription2>| 자세한 정보는 이미지를 클릭해주세요</TabbedDescription2>
                </>
              ) : selectedButton === 2 ? (
                <>
                  <TabbedDescription1>일하고 나서 쉬는 동안</TabbedDescription1>{' '}
                  <TabbedDescription1>고생했던 마음이 녹아내려요</TabbedDescription1>{' '}
                  <TabbedDescription2>| 자세한 정보는 이미지를 클릭해주세요</TabbedDescription2>
                </>
              ) : selectedButton === 3 ? (
                <>
                  <TabbedDescription1>아늑한 주말을 알차게 보낼</TabbedDescription1>{' '}
                  <TabbedDescription1>집순이들을 위해 준비했습니다</TabbedDescription1>{' '}
                  <TabbedDescription2>| 자세한 정보는 이미지를 클릭해주세요</TabbedDescription2>
                </>
              ) : selectedButton === 4 ? (
                <>
                  <TabbedDescription1>불타는 금요일, 헬로 Pick과</TabbedDescription1>{' '}
                  <TabbedDescription1>즐길 준비 되셨나요?</TabbedDescription1>{' '}
                  <TabbedDescription2>| 자세한 정보는 이미지를 클릭해주세요</TabbedDescription2>
                </>
              ) : null}
          </Description1>
            <StyleRow>
              {recommendations1.length > 0 ? (
                <TimeRowImage data={recommendations1.slice(0, 5)} />
              ) : (
                <div style={{ background: 'lightgray', padding: '10px', height: '100%' }}>
                  No Recommendations4 available.
                </div>
              )}
            </StyleRow>
          <ImageInWrapper src="./images/w_button.png" alt="재생버튼" />
        </Wrapper>  

      <ADBanner />
      <div style={{ marginTop: '60px', marginBottom: '10px' }}>
        <h2 style={{ marginBottom: '5px' }}> 🤖 AI가 추천해주는 Playlist </h2>
        {recommendations3.length > 0 ? (
              <RowImage data={recommendations3.slice(0, 20)} />
        ) : (
          <div style={{ background: 'lightgray', padding: '10px' }}>
            No Recommendations4 available.
          </div>
        )}
      </div>
      <div style={{ marginTop: '40px', marginBottom: '0px' }}>
        <h2 style={{ marginBottom: '5px' }}> 📽️ 가장 최근 본 작품과 유사한 Playlist </h2>
      {recommendations4.length > 0 ? (
          <RowImage data={recommendations4.slice(0, 20)} />
      ) : (
        <div style={{ background: 'lightgray', padding: '10px' }}>
          No Recommendations4 available.
        </div>
      )}
      </div>
      
      <div style={{ marginTop: '-10px', marginBottom: '50px' }}>
        <h2 style={{ marginBottom: '5px' }}> 💘 좋아하는 장르 Playlist </h2>
        {recommendations2.length > 0 ? (
          <RowImage data={recommendations2.slice(0, 20)} />
        ) : (
          <div style={{ background: 'lightgray', padding: '10px' }}>
            No Recommendations2 available.
          </div>
        )}
      </div>
    </div>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between; /* 각 요소 사이의 간격을 최대화하여 배치 */
  align-items: flex-start; /* 세로 방향으로 맨 위에 정렬 */
  padding: 20px; /* 원하는 패딩 값으로 조절 */
  background-color: #4A4C59;
  overflow: hidden; /* 넘치는 부분 감춤 */
  position: relative;
  height: 400px;
  margin-top: -5px

`;

const StyleRow = styled.div`
    flex: flex-end; /* 남은 공간을 차지하도록 설정 */
    align-self: flex-start; /* 추가 */
    margin-top: 10px;
    margin-right: 40px;
`;



const ImageInWrapper = styled.img`
position: absolute;
bottom: 42px; /* Wrapper 아래에 위치하도록 지정 */
left: 0; /* Wrapper 왼쪽에 위치하도록 지정 */
width: 80px; /* 필요에 따라 크기 조절 */
height: 80px; /* 필요에 따라 크기 조절 */
margin-left: 35px;
background-color:transparent;
`;


const TabbedDescription1 = styled.span`
  display: inline-block;
  padding-bottom: 5px; /* 밑줄과 텍스트 사이의 간격 조절 */
`;

const TabbedDescription2 = styled.p`
  display: inline-block;
  padding-bottom: 5px; /* 밑줄과 텍스트 사이의 간격 조절 */
  font-size: 15px;
  margin-left: 5px;
  font-weight: normal; 
  margin-top: 20px;
`;


const Description1 = styled.p`
  font-size: 2rem;
  margin-top: 22px;
  margin-left: 20px;
  top: 0;
  color: white;
  font-weight: bold;
  width: 450px;
`;


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
  margin-left: -5px;
  margin-top: 0px;
  margin-bottom: 25px; /* 수정된 부분 */
`;


export default MainPage;







