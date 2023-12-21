import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PopUp from '../../Components/Modal/Modal';

const SearchPage = () => {
  const location = useLocation();
  const searchTerm = decodeURIComponent(new URLSearchParams(location.search).get('term'));
  const [searchData, setSearchData] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [programData, setProgramData] = useState(null);
  const [, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await axios.post('http://main.jinttoteam.com/api/main/search/', {
          programName: searchTerm,
        });

        if (response.data && typeof response.data === 'string') {
          const cleanedData = response.data.replace(/: NaN,/g, ':null,');
          const parseData = JSON.parse(cleanedData);
          setSearchData(parseData.searchData);
          console.log(parseData.searchData);
        } else {
          setSearchData(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.error('프로그램 데이터를 불러오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchData.length > 0) {
      const uniquePrograms = Array.from(new Set(searchData.map(program => program.image + program.clean_asset_nm)))
        .map(uniqueKey => searchData.find(program => uniqueKey === program.image + program.clean_asset_nm));

      setProgramData(uniquePrograms);
    } else {
      // 데이터가 없을 경우 programData를 빈 배열로 설정
      setProgramData([]);
    }
  }, [searchData]);


  const openModal = (image, program) => {
    setSelectedImage(image);
    setSelectedProgram(program);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedProgram(null);
  };


  return (
    <div>
          <HeadContainer>
            {`헬로 Pick이 찾아드려요!`}
            <Underline />
          </HeadContainer>
      {programData && programData.length > 0 ? (
        <>
          <SearchResultText>
            <PinkText>{`"`}{searchTerm}{`"`}</PinkText>
            {`에 대한 검색결과는 `}
            <PinkText>{programData.length}</PinkText>
            {`건 입니다.`}
          </SearchResultText>
          
           {/* Category buttons */}
          <ProgramList>
            {programData.map((program, index) => (
              <ProgramItem key={index} onClick={() => openModal(program.image, program)}>
                {program.image ? (
                  <HoverImage src={program.image} alt={program.clean_asset_nm} />
                ) : (
                  <NoImageContainer>
                    <NoImageText>No image</NoImageText>
                  </NoImageContainer>
                )}
                <p>{program.clean_asset_nm}</p>
              </ProgramItem>
            ))}
          </ProgramList>
        </>
      ) : (
        
        <LoadingMessage>
          <PinkText>{`"`}{searchTerm}{`"`}</PinkText>
          {`에 대한 검색결과는 `}
          <PinkText>0</PinkText>
          {`건 입니다.`}
          <DownMessage>{`검색어의 철자 및 띄어쓰기가 정확한지 확인해 주세요 `}</DownMessage>{' '}
          <DownMessage2>{`검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해주세요.`}</DownMessage2>{' '}
        </LoadingMessage>

      )}
      <PopUp isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} program={selectedProgram} />
    </div>
  );
};

const PinkText = styled.span`
  color: #ED174D;
`;

const SearchResultText = styled.p`
  text-align: center;
  margin-top: 120px;
  font-weight: bold;
  font-size: 30px;
`;

const ProgramList = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const ProgramItem = styled.div`
  flex: 0 0 calc(16.999% - 20px);
  margin: 0 10px 20px;
  margin-bottom: 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  cursor: pointer;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  p {
    margin-bottom: 10px;
  }
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

const HeadContainer = styled.div`
    text-align: center;
    margin-top: 80px;
    font-size: 40px;
    font-weight: bold;
`;

const Underline = styled.div`
  width: 10%;
  height: 5px;
  background-color: #ed174d;
  margin-top: 20px;
  margin-bottom: -30px;
  margin-left: auto;
  margin-right: auto;
`;

const DownMessage = styled.div`
    margin-top: 25px;
    font-size: 15px;
    font-weight: 400;
`;

const DownMessage2 = styled.div`
    margin-top: 5px;
    font-size: 15px;
    font-weight: 400;
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


const LoadingMessage = styled.div`
  text-align: center;
  margin-top: 120px;
  margin-bottom: 300px;
  font-weight: bold;
  font-size: 30px;
`;

export default SearchPage;