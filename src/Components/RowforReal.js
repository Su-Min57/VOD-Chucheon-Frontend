// RowforReal.jsx
import React from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const RowforReal = ({ data, isRecommendations2 }) => {
  const navigate = useNavigate();

  const handleWatchClick = () => {
    navigate('/detailPage');
  };

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {data.map((program, index) => (
        <SwiperSlide key={index} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ margin: '5px', padding: '15px', width: '50%' }}>
            {program.image && (
              <img src={program.image} alt={program.asset_nm} style={{ maxWidth: '100%', height: 'auto' }} />
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '50%', marginLeft: isRecommendations2 ? '0' : '-400px' }}>
            {isRecommendations2 ? null : (
              <>
                <p style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '10px' }}><strong></strong> {program.asset_nm}</p>
                <p style={{ marginBottom: '10px' }}><strong></strong> {program.SMRY}</p>
                <button style={{ padding: '8px 10px', fontSize: '16px', backgroundColor: '#ED174D', color: 'white', border: 'none', cursor: 'pointer', marginTop: '10px' }} onClick={handleWatchClick}>시청하기</button>
              </>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RowforReal;
