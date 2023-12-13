import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const PopUp = ({ isOpen, onRequestClose, imageUrl, program }) => {
  const handleButtonClick = (buttonType) => {
    // 버튼 클릭에 대한 동작을 추가할 수 있습니다.
    console.log(`Button clicked: ${buttonType}`);
  };
  
  //program 변수가 null이 아닌지 확인한 후에 속성에 접근하도록 해주는 코드
  if (!program) {
    return null;
  }
  
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
        },
        content: {
          display: 'flex', //부모 컨테이너를 플렉스로 설정
          flexDirection: 'row', //플렉스 방향을 가로로 설정
          alignItems: 'center', //수직 정렬을 가운데로 설정
          justifyContent: 'center', //수평 정렬을 가운데로 설정
          maxWidth: '80%',
          maxHeight: '80vh',
          margin: 'auto',
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.2)', // 이미지를 흐리게 보이도록 설정
          borderRadius: '10px',
          backdropFilter: 'blur(10px)', // 배경을 흐리게 만듦
        },
      }}
    >
      <PopUpContainer>
        <ImageContainer>
          <PopUpImage src={imageUrl} alt="Popup" />
        </ImageContainer>
        <ContentContainer>
          <Title>{program.asset_nm}</Title>
          <Description>{program.SMRY}</Description>
          <ButtonContainer>
            <Button onClick={() => handleButtonClick('trailer')}>예고편</Button>
            <Button onClick={() => handleButtonClick('actor')}>배우</Button>
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
  flex: 1; // 이미지가 버튼보다 더 크게 차지하도록 설정
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  flex: 1; // 텍스트와 버튼이 이미지보다 더 크게 차지하도록 설정
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px; // 이미지와 텍스트 사이 간격 조절
  margin-right: 20px;
`;

const PopUpImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px; // 이미지 주위에 둥근 모서리를 추가
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: left;
`;

const Button = styled.button`
  background-color: ${oc.pink[6]};
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
  margin-bottom: 60px;
`;

const Description = styled.p`
  margin-bottom: 50px;
  font-size: 18px;
  color: white;
`;

export default PopUp;
