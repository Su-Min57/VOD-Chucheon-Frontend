import React, { useState,  useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import PopUp from '../../Components/Modal/Modal';

const SearchComponent = () => {
  const [data, setData] = useState([]);
  const [programName, setProgramName] = useState('');
  const [programData, setProgramData] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');

  useEffect(() => {
    if (data.length > 0) {
      const uniquePrograms = Array.from(new Set(data.map(program => program.image + program.clean_asset_nm)))
        .map(uniqueKey => data.find(program => uniqueKey === program.image + program.clean_asset_nm));

      setProgramData(uniquePrograms);
    }
  }, [data]);

  const handleProgramNameChange = (e) => {
    setProgramName(e.target.value);
  };

  const handleSearch = async () => {
    try {

      const response = await axios.post('https://main.jinttoteam.com/api/main/search/', {
        programName: programName,
      });

      if (response.data && typeof response.data === 'string') {
        const cleanedData = response.data.replace(/: NaN,/g, ': null,');
        const parsedData = JSON.parse(cleanedData);
        setData(parsedData.data);
        console.log(parsedData.data);
      } else {
        setData(response.data.data);
        console.log(response.data.data);
      }
    } catch (error) {
      console.error('프로그램 데이터를 불러오는 중 오류 발생:', error);
    } finally {
    }
  };

  const openModal = (image, program) => {
    setSelectedImage(image);
    setSelectedProgram(program);
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
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </InputLabel>
        {programData && programData.length > 0 && (
          <SearchResult>
            <SearchResultLabel>프로그램 검색 결과: {programName} </SearchResultLabel>
            <ProgramList>
              {programData.map((program, index) => (
                <ProgramItem key={index} onClick={() => openModal(program.image, program)}>
                  {program.image ? (
                    <HoverImage
                      src={program.image}
                      alt={program.clean_asset_nm}
                      style={{ width: '100%', objectFit: 'cover' }}
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
        <NoResultMessage>검색 결과가 없습니다.</NoResultMessage>
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
  flex-direction: row; 
  align-items: center;
  position: relative;
  margin-top: 80px;
  margin-bottom: 20px;
  width: 430px;
  height: 55px;
  box-sizing: border-box;
  border: 4px solid #ED174D;
  border-radius: 25px; 
  padding: 0px;
  background-color: #ED174D;
`;

const Input = styled.input`
  flex: 1;
  padding: 15px;
  font-size: 16px;
  margin-top: 0px; /* 수정된 부분 */
  width: calc(100% - 50px);
  height: 100%;
  margin-right: 0px;
  color: black;
  background-color: white;
  border: none; 
  box-sizing: border-box;
  border-radius: 25px;
  outline: none; 
`;

const GuideText = styled.span`
  font-size: 14px;
  color: gray;
  position: absolute;
  top: 50%;
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
  width: 70px; 
  height: 50px;
  border-radius: 25px;
  box-sizing: border-box;
  margin-left: 0px;
`;

const SearchResultLabel = styled.p`
  font-size: 24px;
  color: white;
  margin-top: 10px;
  margin-bottom: 30px;
`;

const SearchResult = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const NoResultMessage = styled.p`
  font-size: 20px;
  color: white;
  margin-top: 30px; 
`;

const ProgramList = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  flex-wrap: wrap; /* 여러 행으로 나누어질 수 있도록 설정 */
`;

const ProgramItem = styled.div`
  flex: 0 0 calc(16.999% - 20px);
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
    object-fit: cover;
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
  max-width: 100%; 
  max-height: 100%; 
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
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.3s; 
  &:hover {
    transform: scale(1.1); 
  }
`;

export default SearchComponent;