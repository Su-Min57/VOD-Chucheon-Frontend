import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components'; // 추가된 부분
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
      <h2>{`"${searchTerm}"`}에 대한 검색 결과</h2>
      <ProgramList>
        {programData && programData.map((program, index) => (
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
      <PopUp isOpen={!!selectedImage} onRequestClose={closeModal} imageUrl={selectedImage} program={selectedProgram} />
    </div>
  );
};

// 추가된 부분 시작
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



export default SearchPage;