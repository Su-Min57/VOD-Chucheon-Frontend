import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SwiperSlide } from 'swiper/react';

const imageUrls = [
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_0_20231211133517200.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_0_20231211173615634.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_0_20231208160331937.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_0_20231211083219990.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_2_20231208160331964.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_0_20231211083653151.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_4_20231208160331987.jpg",
  "https://seasonmarket.co.kr/public/static/images/image/link/202312/LINK_mainmodule_213_5_20231208160331998.png",
];

const ADBanner = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: false,
  };

  useEffect(() => {
    // Resize slick track on window resize
    const handleResize = () => {
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <StyledSlider {...settings} ref={sliderRef}>
      {imageUrls.map((imageUrl, index) => (
        <SwiperSlide key={index}>
          <a href="https://seasonmarket.co.kr/" target="_blank" rel="noopener noreferrer">
            <ImageContainer>
              <Image src={imageUrl} alt={`Banner ${index + 1}`} />
            </ImageContainer>
          </a>
        </SwiperSlide>
      ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }
`;

const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 150%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 5%; /* 1:1 Aspect Ratio */
  padding-bottom: 25%;
  position: relative;

  img {
    position: absolute;
    top: 10;
    left: 0;
    width: 100%;
    height: auto%;
    object-fit: cover;
  }
`;

export default ADBanner;
