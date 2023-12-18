import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components'; 

const Weather = () => {
    // 상태 변수 정의
    const [weatherData, setWeatherData] = useState({
      temp: 0,
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      desc: '',
      icon: "",
      loading: true,
    });

    // 현재 날짜 정보를 가져오는 함수
    const getCurrentDate = () => {
    const currentDate = new Date();
    //const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 맞춤
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    return `${month}.${day} / ${hours}:${minutes}`;
  };
  
    // 컴포넌트 생성 후 날씨 정보 조회
    useEffect(() => {
      const fetchData = async () => {
        const cityName = 'Seoul'; // 본인이 원하는 도시로 변경 가능
        const apiKey = process.env.REACT_APP_WEATHER_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
        try {
            const response = await axios.get(url);
            const data = response.data;
            console.log("날씨 데이터 가져오기 성공")

          setWeatherData({
            temp: data.main.temp,
            temp_max: data.main.temp_max,
            temp_min: data.main.temp_min,
            humidity: data.main.humidity,
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
            loading: false,
          });
        } catch (error) {
          console.error('날씨 정보를 가져오는 중 오류 발생:', error);
        }
      };
  
      fetchData();
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정
  
    // 날씨 정보 출력
    return (
        <Wrapper>
            <WeatherWrapper>
                <TemperText>{(weatherData.temp - 273.15).toFixed(0)}°</TemperText>
                <WeatherImg
                  src={`https://openweathermap.org/img/w/${weatherData.icon}.png`}
                  alt="Weather Icon"
                />
            </WeatherWrapper>
            <DateText>{getCurrentDate()}</DateText>
      </Wrapper>
    );
  };
  

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  height: 60px;
  background-color: #181818;
  border-radius: 8px;
  border: false;
`;

const WeatherWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

const TemperText = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

const WeatherImg = styled.img`
  width: 60px; /* 이미지 크기 조절 */
`;

export default Weather;
