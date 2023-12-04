import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchComponent = () => {
  const [programName, setProgramName] = useState('');
  const [programData, setProgramData] = useState(null);

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

  return (
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
              <ProgramItem key={index}>
                {program.image ? ( 
                    <img 
                      src={program.image} 
                      alt={program.clean_asset_nm}
                      style={{ width: '100%', height: '100%', objectFit:'contain'}} />
                ) : (
                  <NoImageText>No Image</NoImageText>
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
    </Container>
  );
};

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
  margin-top: 30px;
  margin-bottom: 20px;
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
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
`;

const SearchButton = styled.button`
  background-color: #ED174D;
  color: white;
  padding: 10px;
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

  img {
    width: 200px;
    height: auto;
  }

  p {
    margin-bottom: 10px;
  }
`;

const ImageContainer = styled.div`
  margin-top: 20px;
  padding: 15px;
  width: 350px;
  height: 450px; /* 고정 높이 설정 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
`;

const NoImageText = styled.div`
  color: gray;
  font-size: 16px;
  margin-top: 0px;
  width: 100%; /* 가로 폭을 100%로 설정하여 부모 요소에 맞게 크기 조절 */
  height: 100%; /* 세로 높이를 100%로 설정하여 부모 요소에 맞게 크기 조절 */
  box-sizing: border-box; /* border를 포함한 크기 계산을 위해 box-sizing 속성 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
`;

export default SearchComponent;