import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SwiperSlide } from 'swiper/react';

// 이미지 폴더를 동적으로 불러오기
//const importAll = (r) => r.keys().map(r);
//const images = importAll(require.context('../../public/images/seasonmarket_images', true, /\.(jpg)$/));

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
  // react-slick 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <StyledSlider {...sliderSettings}>
        {imageUrls.map((imageUrl, index) => (
            <SwiperSlide key={index} style={{ width: '30%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <a href="https://seasonmarket.co.kr/" target="_blank" rel="noopener noreferrer">
                    <ImageContainer>
                        <Image src={imageUrl} alt={`Banner ${index + 1}`} />
                    </ImageContainer>
                    {console.log(`Image ${index + 1} URL:`, imageUrl)}
                </a>
            </SwiperSlide>
        ))}
    </StyledSlider>
  );
};

const StyledSlider = styled(Slider)`
  display: flex;
  flex-direction: center;
  height: 400px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  align-items: center;
  img {
    max-width: 100%;
    height: auto;
    margin: 0%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

export default ADBanner;
