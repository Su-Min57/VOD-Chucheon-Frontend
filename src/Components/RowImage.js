import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import PopUp from './Modal/PopUp';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RowImage = ({ data }) => {
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedProgram, setSelectedProgram] = useState('');

    //PopUp.js에서 사용할 data를 prop형태로 보내기 위한 구문
    const openModal = (image, program) => {
      setSelectedImage(image);
      setSelectedProgram(program)
    };
  
    const closeModal = () => {
      setSelectedImage(null);
      setSelectedProgram(null);
    };

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
          <ImageContainer onClick={() => openModal(program.image, program)}>
            {program.image ? (
              <HoverImage 
              src={program.image}
              alt={program.clean_asset_nm}
              style={{ width: '100%', height: '100%', objectFit:'contain'}}
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

      <PopUp isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} program={selectedProgram} />
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

const HoverImage = styled.img`
  max-width: 100%;
  height: auto;
  transition: transform 0.3s; /* 호버 효과를 위한 트랜지션 설정 */
  &:hover {
    transform: scale(1.1); /* 호버 시 이미지 확대 */
  }
`;

export default RowImage;
