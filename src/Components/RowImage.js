import React from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RowImage = ({ data }) => {
  // Filter unique clean_asset_nm values
  const uniqueData = data.reduce((unique, program) => {
    if (!unique.find((item) => item.clean_asset_nm === program.clean_asset_nm)) {
      unique.push(program);
    }
    return unique;
  }, []);

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true, el: '.swiper-pagination' }}
      scrollbar={{ draggable: true, el: '.swiper-scrollbar' }}
    >
      <div className="swiper-pagination" style={{ display: 'none' }} />
      <div className="swiper-scrollbar" style={{ display: 'none' }} />

      {uniqueData.map((program, index) => (
        <SwiperSlide key={index}>
          <ImageContainer>
            {program.image ? (
              <img
                src={program.image}
                alt={program.clean_asset_nm}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <NoImageContainer>
                <NoImageText>No Image</NoImageText>
              </NoImageContainer>
            )}
            <p>{program.clean_asset_nm}</p>
          </ImageContainer>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const ImageContainer = styled.div`
  margin: 0.5px;
  padding: 5px;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
  }
`;

const NoImageContainer = styled.div`
  color: gray;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  width: 100%;
  height: 0;
  padding-bottom: 150%;
  box-sizing: border-box;
`;

const NoImageText = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

export default RowImage;
