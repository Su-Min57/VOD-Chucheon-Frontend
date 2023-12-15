import React from "react";
import styled from "styled-components";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { SwiperSlide } from 'swiper/react';
import Slider from 'react-slick';
import 'swiper/swiper-bundle.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
//import { useNavigate } from "react-router-dom";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// 이미지 폴더를 동적으로 불러오기
//const importAll = (r) => r.keys().map(r);
//const images = importAll(require.context('../../../public/images/seasonmarket_images', true, /\.(jpg)$/));

const imageUrls = [
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/KO_dds_main_solo_vertical_27x40_rgb_post_1.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/Doona!_Main_Vertical_RGB_POST_KMRB_1014.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/dok2.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/KO_Ballerina_main_27x40_rgb_post_1.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/KO_SOB_Season-1_-Character-SOB_KA_C_01-_Vertical_27x40_4x5_RGB_POST_Hires.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/your%20time.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/ko_mg_main_momi_vertical_27x40_rgb_post_1.jpg",
    "https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/KO_The-Devil's-Plan-_Season-1-Main-devils_m_Vertical_27x40_4x5_RGB_POST.jpg",
];

const Now = () => {
    //const navigate = useNavigate();

    // react-slick의 설정
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
  };

    return (
        <Wrapper>
            <DescriptionBox>
                <img src="https://www.lghellovision.net/CJH_Files/KOR_NEW/INTEGRATED_MAIN/size_test_now2.png" alt='now'></img>
                <Description1>#정주행 #집콕생활</Description1>
                <Description2>헬로 Pick 추천 콘텐츠</Description2>
                <MoreButton href="https://www.lghellovision.net/main.do" target="_blank" rel="noopener noreferrer">  
                    헬로tv 더 알아보기 👉
                </MoreButton>
            </DescriptionBox>
            <StyledSlider {...sliderSettings}> 
                {imageUrls.map((imageUrl, index) =>
                    <SwiperSlide key={index} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <ImageBox>    
                            <Image src={imageUrl} alt={`Banner ${index + 1}`} />
                        </ImageBox>
                    </SwiperSlide>  
                )}
            </StyledSlider>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    position: realtive;
    flex-direction: center;
    height: 400px;
    width: 1440px;
    zIndex: 0;
    margin: 0 auto;
    padding: 0;
`;

const StyledSlider = styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    width: 952px;
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 4px;
  width: 480px;
  margin-left: 3%;
`;

const Description1 = styled.p`
  font-size: 2.3rem;
  margin-top: 15px;
  color: white;
`;

const Description2 = styled.p`
  font-size: 2.3rem;
  font-weight: bold;
  margin-top: -40px;
  margin-bottom: 10px;
  color: white;
`;

const MoreButton = styled.a`
  margin-top: 20px;
  padding: 8px 10px;
  font-size: 16px;
  background-color: #ed174d;
  color: white;
  border: 2px solid #ed174d;
  border-radius: 25px;
  cursor: pointer;
  box-sizing: border-box;
  text-decoration: none;
`;

const ImageBox = styled.div`
    margin: 5px;
    padding: 5px;
    text-align: center;
    
    img {
    max-width: 100%;
    width: 230px;
    height: 305px;
    }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

export default Now;