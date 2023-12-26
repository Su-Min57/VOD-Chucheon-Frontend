import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PopUp = ({ isOpen, onRequestClose, imageUrl, program }) => {
  const [showMore, setShowMore] = useState(false);

  const handleButtonClick = (buttonType) => {
    // 버튼 클릭에 대한 동작을 추가할 수 있습니다.
    console.log(`Button clicked: ${buttonType}`);
    
    // '시청하기' 버튼이면 새 창에서 페이지를 엽니다.
    if (buttonType === 'trailer') {
      window.open('https://www.lghellovision.net/product/tv/tvVod.do', '_blank');
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

  const truncatedACTR_DISP = showMore
  ? program.ACTR_DISP
  : program.ACTR_DISP.length > 20
  ? `${program.ACTR_DISP.slice(0, 100)}`
  : `${program.ACTR_DISP}`;


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
          <PopUpImage src={imageUrl} alt="Popup" style={{ width: '300px', height: '430px', objectFit: 'cover'}} />
        </ImageContainer>
        <ContentContainer>
          <TitleContainer>
            <Title>{program.asset_nm}</Title>
          </TitleContainer>
          <SubDescriptionContainer>
            <SubDescription>
              <SubDescription2>출연: {truncatedACTR_DISP}</SubDescription2>
              <SubDescription2>대분류: {program.category_h}</SubDescription2>
              <SubDescription2>소분류: {program.category_l}</SubDescription2>
            </SubDescription>
          </SubDescriptionContainer>
          <DescriptionContainer>
            <Description>{program.SMRY || "요약을 찾지 못했습니다"}</Description>
          </DescriptionContainer>
          <ButtonContainer>
            <Button onClick={() => handleButtonClick('trailer')}>시청하기</Button>
          </ButtonContainer>
        </ContentContainer>
        <CloseButton onClick={onRequestClose}>
          <CloseButtonImage src = "/images/close_icon.png" alt="Close" />
        </CloseButton>
      </PopUpContainer>
    </Modal>
  );
};

const PopUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 430px;
  object-fit: cover;
  margin-left: 50px;
  margin-right: 10px;
  max-height: 430px;
`;

const SubDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center;
  margin-bottom: 20px;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 80px; 
  width: 730px;
  height: 100%;
`;

const PopUpImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px; 
  margin-bottom: 20px; 
`;

const Button = styled.button`
  background-color: #ed174d;
  color: white;
  padding: 10px;
  height: 50px;
  font-size: 18px;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  margin-top: 0px;
  margin-bottom: 0px;
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

const TitleContainer = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-bottom: 10px; 
  margin-top: 10px; 
  max-height: 100px; 
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Title = styled.p`
  padding: 0px;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const DescriptionContainer = styled.div`
  margin-top: auto;
  margin-bottom: 20px;
  font-size: 17px;
  color: white;
  width: 550px;
  margin-right: 100px;
`;

const Description = styled.p`
  margin-top: auto;
  margin-bottom: 20px; 
  font-size: 17px;
  color: white;
`;

const SubDescription = styled.p`
  font-size: 17px;
  color: white;
  margin-top: 0px;
  margin-bottom: 10px;
`;

const SubDescription2 = styled.p`
  font-size: 17px;
  color: white;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CloseButtonImage = styled.img`
  width: 30px;
  height: auto;
`;

export default PopUp;