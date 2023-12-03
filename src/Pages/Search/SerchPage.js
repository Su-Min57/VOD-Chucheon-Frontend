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

      setProgramData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching program data:', error);
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
                {program.image && (
                  <div>
                    <img src={program.image} alt={program.asset_nm} style={{ width: '200px', height: 'auto' }} />
                    <p>{program.asset_nm}</p>
                  </div>
                )}
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
  flex-wrap: wrap; /* 추가: 열마다 5개의 항목을 표시하기 위해 flex-wrap 속성 추가 */
  margin-top: 20px;
`;

const ProgramItem = styled.div`
  margin: 0 10px 20px; /* 추가: 각 프로그램 간의 간격 조정 */
  text-align: center;
`;

export default SearchComponent;
