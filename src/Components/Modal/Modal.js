import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { FaHeart } from 'react-icons/fa';

Modal.setAppElement('#root');

const PopUp = ({ isOpen, onRequestClose, imageUrl, program }) => {
  const [showMore, setShowMore] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleButtonClick = (buttonType) => {
    // 버튼 클릭에 대한 동작을 추가할 수 있습니다.
    console.log(`Button clicked: ${buttonType}`);
    
    // '좋아요' 버튼이면 상태를 토글합니다.
    if (buttonType === 'like') {
      setIsLiked(!isLiked);
    }

  };

  if (!program) {
    return null;
  }

  // 모달이 닫힐 때 showMore 상태를 초기화
  const handleCloseModal = () => {
    setShowMore(false);
    onRequestClose();
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const truncatedACTR_DISP = showMore
  ? program.ACTR_DISP
  : program.ACTR_DISP.length > 20
  ? `${program.ACTR_DISP.slice(0, 20)}...`
  : `${program.ACTR_DISP}...`;


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Image Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
        },
        content: {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '80%',
          maxHeight: '80vh',
          margin: 'auto',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '10px',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <PopUpContainer>
        <ImageContainer>
          <PopUpImage src={imageUrl} alt="Popup" />
        </ImageContainer>
        <ContentContainer>
          <Title>
            {program.asset_nm}
            <FaHeart style={{ 
              verticalAlign: 'middle', 
              marginBottom: '13px', 
              marginLeft: '15px', 
              color: isLiked ? 'red' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '40px',
              cursor: 'pointer',
              }} 
              onClick={() => handleButtonClick('like')}
            />
          </Title>
          <SubDescriptionContainer>
            <SubDescription>
                출연: {truncatedACTR_DISP}
                  <span style={{ verticalAlign: 'middle' }}> </span>
                  <span onClick={toggleShowMore} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                    {showMore ? '간략히 보기' : '더보기'}
                  </span>
            </SubDescription>
          </SubDescriptionContainer>
          {showMore && (
            <>
              <SubDescription2>대분류: {program.category_h}</SubDescription2>
              <SubDescription2>소분류: {program.category_l}</SubDescription2>
            </>
          )}
          <Description>{program.SMRY}</Description>
          <ButtonContainer>
            <Button onClick={() => handleButtonClick('watch')}>예고편</Button>
            <Button onClick={() => handleButtonClick('trailer')}>시청하기</Button>
          </ButtonContainer>
        </ContentContainer>
        <CloseButton onClick={onRequestClose}>닫기</CloseButton>
      </PopUpContainer>
    </Modal>
  );
};

const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubDescriptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  margin-right: 20px;
`;

const PopUpImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: left;
`;

const Button = styled.button`
  background-color: #ed174d;
  color: white;
  padding: 10px;
  margin: 0 30px 0 0;
  font-size: 18px;
  cursor: pointer;
  border: none;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const Description = styled.p`
  margin-top: 20px;
  margin-bottom: 50px;
  font-size: 17px;
  color: white;
`;

const SubDescription = styled.p`
  font-size: 15px;
  color: white;
`;

const SubDescription2 = styled.p`
  font-size: 15px;
  color: white;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export default PopUp;
