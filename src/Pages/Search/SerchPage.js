import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PopUp from '../../Components/Modal/Modal';

const SearchComponent = () => {
  const [programName, setProgramName] = useState('');
  const [programData, setProgramData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');


  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/main/search/', {
        programName: programName,
      });

      const uniquePrograms = Array.from(new Set(response.data.data.map(program => program.image + program.clean_asset_nm)))
        .map(uniqueKey => response.data.data.find(program => uniqueKey === program.image + program.clean_asset_nm));

      setProgramData(uniquePrograms);
      console.log(uniquePrograms);
    } catch (error) {
      console.error('프로그램 데이터를 불러오는 중 오류 발생:', error);
    }
  };

  //PopUp.js에서 사용할 data를 prop형태로 보내기 위한 구문
  const openModal = (image, program) => {
    setSelectedImage(image);
    setSelectedProgram(program)
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedProgram(null);
  };

  return (
    <>
    <Container>
        <InputLabel>
          <Input type="text" value={programName} onChange={handleProgramNameChange} />
          {programName === '' && <GuideText>영화 또는 TV프로그램명을 입력하세요.</GuideText>}
        </InputLabel>
        <SearchButton onClick={handleSearch}>검색</SearchButton>
        {programData && programData.length > 0 && (
        <SearchResult>
          <ProgramList>
            {programData.map((program, index) => (
              <ProgramItem key={index} onClick={() => openModal(program.image, program)}>
                  {program.image ? ( 
                      <HoverImage
                        src={program.image} 
                        alt={program.clean_asset_nm}
                        style={{ width: '100%', objectFit:'contain'}} // , height: '100%'
                      />
                  ) : (
                  <NoImageContainer>
                    <NoImageText>No image</NoImageText>
                  </NoImageContainer>
                  )}
                    <p>{program.clean_asset_nm}</p>
              </ProgramItem>
            ))}
          </ProgramList>
        </SearchResult>
      )}

      {programData && programData.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}
      <PopUp isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} program={selectedProgram} />
    </Container>
    <BlackContainer>
    </BlackContainer>
    </>
  );
};

const BlackContainer = styled.div`
  background-color: black;
  width: 100vw; /* 100% viewport width */
  height: 70vh; /* 100% viewport height */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
`;


const InputLabel = styled.label`
  display: flex;
  position: relative;
  margin-top: 100px;
  margin-bottom: 20px;
  width: 350px;
  height: 50px;
  box-sizing: border-box;
`;

const Input = styled.input`
  flex: 1;
  padding: 8px;
  font-size: 16px;
  margin-top: 30px;
  width: 300px;
  margin-top: 10px;
  margin-right: 10px;
  width: 300px;
  color: black;
  background-color: white;
`;

const GuideText = styled.span`
  font-size: 14px;
  color: gray;
  position: absolute;
  top: 55%;
  left: 12px;
  transform: translateY(-50%);
`;

const SearchButton = styled.button`
  background-color: #ED174D;
  color: white;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  border: none;
`;

const SearchResult = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ProgramList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const ProgramItem = styled.div`
  flex: 0 0 calc(16.666% - 20px);
  margin: 0 10px 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;

  img {
    width: 100%;
    height: auto;
  }

  p {
    margin-bottom: 10px;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100%;
  left: 0;
`;

const HoverImage = styled.img`
  max-width: 100%;
  height: auto;
  transition: transform 0.3s; /* 호버 효과를 위한 트랜지션 설정 */
  &:hover {
    transform: scale(1.1); /* 호버 시 이미지 확대 */
  }
`;

export default SearchComponent;