import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import './MySwiper.css'; // 스타일 파일을 불러옵니다.

const SurveyPage = () => {
  // 행과 열의 수 설정
  const rows = 4;
  const columns = 15;

  return (
    <div>
      {[...Array(rows)].map((row, rowIndex) => (
        <div key={rowIndex}>
          <h2>{`${rowIndex + 1}번 행`}</h2>
          <Swiper
            spaceBetween={20}
            slidesPerView={columns > 4 ? 4 : columns}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {[...Array(columns)].map((col, colIndex) => (
              <SwiperSlide key={colIndex}>
                <div className="image-box">
                  <p>{`${rowIndex * columns + colIndex + 1}번`}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default SurveyPage;
