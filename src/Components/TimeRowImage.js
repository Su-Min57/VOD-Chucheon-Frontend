import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import PopUp from './Modal/Modal';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RowImage = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  const openModal = (image, program) => {
    setSelectedImage(image);
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedProgram(null);
  };

  const uniqueData = data.reduce((unique, program) => {
    if (!unique.find((item) => item.clean_asset_nm === program.clean_asset_nm)) {
      unique.push(program);
    }
    return unique;
  }, []);

  return (
    <>      
      <StyledSwiper
        spaceBetween={10}
        slidesPerView={5}
        navigation={true} // navigation 활성화
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        scrollbar={{ draggable: true, el: '.swiper-scrollbar' }}
      >
        <div className="swiper-pagination" style={{ display: 'none' }} />
        <div className="swiper-scrollbar" style={{ display: 'none' }} />
        
        {uniqueData.map((program, index) => (
            <SwiperSlide key={index}>
                {program.image && (
                <ImageContainer onClick={() => openModal(program.image, program)}>
                    <div>
                    <HoverImage 
                        src={program.image}
                        alt={program.clean_asset_nm}
                        style={{ width: '100%', height: '100%', objectFit: 'contain'}}
                    />
                    <p>{program.clean_asset_nm}</p>
                    </div>
                </ImageContainer>
                )}
            </SwiperSlide>
            ))}
        </StyledSwiper>
      <PopUp isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} program={selectedProgram} />
    </>
  );
};


const StyledSwiper = styled(Swiper)`
   max-height: 100%;
  .swiper-button-prev,
  .swiper-button-next {
    background-color: black;
    opacity: 1;
    padding: 5px 5px;
    width: 20px;   /* 버튼의 너비 */
    height: 20px;  /* 버튼의 높이 */
    color: white !important;
    border-radius: 50px;
    position: absolute;  /* 절대 위치 설정 */
    top: 50%;            /* 상단에서의 위치 (수직 중앙) */
    transform: translateY(-50%);  /* 세로 중앙 정렬 */
    transition: opacity 0.3s;  /* 투명도 변화에 애니메이션 효과 적용 */
    opacity: 0;  /* 기본적으로 투명하게 설정 */
  }

  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 0.7;  /* 마우스 호버 시에만 투명도를 다시 설정하여 나타나도록 함 */
    }
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-size: 0.8rem !important;
    font-weight: 600 !important;
  }

  .swiper-pagination-bullet {
    background: black !important;
  }
`;

const ImageContainer = styled.div`
  margin: 0.5px;
  padding: 5px;
  cursor: pointer; 
  text-align: center;
  img {
    max-width: 100%;
    max-height: 100%;
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
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default RowImage;
