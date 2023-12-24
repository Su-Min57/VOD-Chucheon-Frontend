import React, { useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from './Modal/Modal';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const TimeRowImage = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (image, program) => {
    setSelectedImage(image);
    setSelectedProgram(program);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setSelectedProgram('');
    setIsModalOpen(false);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
  };

  return (
    <>
      <StyledSlider {...sliderSettings}>
        {data.map((program, index) => (
          program.image && (
            <SwiperSlide key={index}>
              <ImageContainer onClick={() => openModal(program.image, program)}>
                {program.image && (
                  <HoverImage
                    src={program.image}
                    alt={program.asset_nm}
                    style={{ width: "250px", height: "300px", objectFit: "cover"}}
                    onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                    onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                  />
                )}
                <Titleletter>{program.asset_nm}</Titleletter>
              </ImageContainer>
            </SwiperSlide>
          )
        ))}
      </StyledSlider>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} imageUrl={selectedImage} program={selectedProgram} />
    </>
   );
 };

const StyledSlider = styled(Slider)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  width: 600px;
  .slick-slide {
    margin: 0 0px 5px;
  }
  background-color: #4A4C59;
  
`;

const Titleletter = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
  color: white;
`;

const HoverImage = styled.img`
  max-width: 100%;
  height: auto;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  margin: 30px;
  padding: 5px;
  text-align: center;
  cursor: pointer;

  img {
    max-width: 100%;
    width: 230px;
    height: 305px;
  }
`;

export default TimeRowImage;
