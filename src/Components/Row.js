import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Row = ({ data }) => {

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <StyledSlider {...sliderSettings}>
      {data.map((program, index) => (
        <SwiperSlide key={index}>
            <ImageContainer>
              {program.image && <img src={program.image} alt={program.asset_nm} />}
            </ImageContainer>
         
            <Titleletter>{program.asset_nm}</Titleletter>
           
        </SwiperSlide>
      ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: pink;

`;


const Titleletter = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div`
  margin-top: 70px;
  width: 100%;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

export default Row;
