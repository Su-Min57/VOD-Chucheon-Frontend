import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Slider from 'react-slick'; // 추가: react-slick 불러오기
import 'slick-carousel/slick/slick.css'; // 추가: slick-carousel 스타일 불러오기
import 'slick-carousel/slick/slick-theme.css'; // 추가: slick-carousel 테마 스타일 불러오기
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Row = ({ data, isRecommendations2 }) => {
  const navigate = useNavigate();

  const handleWatchClick = () => {
    navigate('/detailPage');
  };

  // react-slick의 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <StyledSlider {...sliderSettings}>
      {data.map((program, index) => (
        <div key={index}>
          <SwiperSlide style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <ImageContainer>
              {program.image ? (
                <img src={program.image} alt={program.asset_nm} />
              ) : (
                <NoImageText>No Image</NoImageText>
              )}
            </ImageContainer>
            <DescriptionContainer isRecommendations2={isRecommendations2}>
              {isRecommendations2 ? null : (
                <>
                  <Title>{program.asset_nm}</Title>
                  <Description>{program.SMRY}</Description>
                  <WatchButton onClick={handleWatchClick}>시청하기</WatchButton>
                </>
              )}
            </DescriptionContainer>
          </SwiperSlide>
        </div>
      ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  /* 여기에 Swiper에 대한 추가적인 스타일을 적용할 수 있습니다. */
`;

const ImageContainer = styled.div`
  margin: 5px;
  margin-left: 5%;
  padding: 15px;
  width: 50%;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
    margin-left: 5%;
  }
`;
const NoImageText = styled.p`
  color: gray;
  font-size: 16px;
  margin-top: 20px;
  width: 350px; /* 수정: 너비 350px로 지정 */
  height: 450px; /* 수정: 높이 450px로 지정 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray; /* 선택: 테두리 추가 */
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin-right: 10%;
  user-select: ${({ isRecommendations2 }) => (isRecommendations2 ? 'none' : 'text')};
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-bottom: 10px;
`;

const WatchButton = styled.button`
  padding: 8px 10px;
  font-size: 16px;
  background-color: #ed174d;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 10px;
`;

export default Row;
