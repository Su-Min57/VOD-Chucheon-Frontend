import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const SearchModal = ({ isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [searchText, setSearchText] = useState('');
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [topPosition, setTopPosition] = useState(90);

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      // 엔터 키를 눌렀을 때 "확인" 버튼 클릭 로직 실행
      changePage();
      resetSearchText();
    }
  };

  const changePage = () => {
    // Use encodeURIComponent to handle special characters in the URL
    const encodedSearchText = encodeURIComponent(searchText);
    navigate(`/search?term=${encodedSearchText}`);
    window.scrollTo(0, 0);
    onClose();
  };

  // Added to reset the searchText state
  const resetSearchText = () => {
    setSearchText('');
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // 모달 내부를 클릭해도 모달이 닫히지 않도록
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && modalRef.current.contains(e.target)) {
      // 모달 내부를 클릭한 경우, 모달을 닫지 않음
      return;
    }
    // 모달 이외의 영역을 클릭한 경우, 모달을 닫음
    onClose();
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleRecommendedSearchClick = (recommendedTerm) => {
    // Use encodeURIComponent to handle special characters in the URL
    const encodedRecommendedTerm = encodeURIComponent(recommendedTerm);
    navigate(`/search?term=${encodedRecommendedTerm}`);
    window.scrollTo(0, 0);
    onClose();
  };

  useEffect(() => {
    // 모달이 열릴 때 input 요소에 포커스를 주기
    if (isOpen) {
      // setTimeout을 사용하여 다음 렌더링 사이클에서 포커스가 잡히도록 함
      setTimeout(() => {
        if (modalRef.current) {
          const inputElement = modalRef.current.querySelector("input");
          if (inputElement) {
            inputElement.focus();
          }
        }
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(true);
      const topPosition = Math.max(90 - currentScrollY, 0);
      setTopPosition(topPosition);
      if (currentScrollY !== 0) {
        onClose();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onClose]);


  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef} onClick={handleModalClick} isVisible={isVisible} top={topPosition}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="찾으시는 프로그램명을 입력하세요."
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleEnterKey} // 엔터 키 감지 이벤트
          />
          <SearchButton
            active={pathname === '/search' ? 'true' : 'false'}
            onClick={() => {
              changePage("/search");
              resetSearchText();
            }}
          />
        </SearchContainer>
        <TitleContainer>{`추천 검색어`}
          <Divider>|</Divider>
        </TitleContainer>
        <RecommendedContainer>
        {/* Recommended search terms */}
          <RecommendedSearchTerm onClick={() => handleRecommendedSearchClick('뽀로로')}>뽀로로</RecommendedSearchTerm>
          <RecommendedSearchTerm onClick={() => handleRecommendedSearchClick('공룡')}>공룡</RecommendedSearchTerm>
          <RecommendedSearchTerm onClick={() => handleRecommendedSearchClick('서울')}>서울</RecommendedSearchTerm>
          <RecommendedSearchTerm onClick={() => handleRecommendedSearchClick('사랑')}>사랑</RecommendedSearchTerm>
          <RecommendedSearchTerm onClick={() => handleRecommendedSearchClick('핑크퐁')}>핑크퐁</RecommendedSearchTerm>
        {/* Add more recommended search terms as needed */}
        </RecommendedContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};


const RecommendedContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  margin-left: 70px;
`;

const Divider = styled.span`
  margin: 0 25px;
  color: white;
`;

const TitleContainer = styled.div`
  margin-top: 10px;
  margin-left: -305px;
`;

const ModalOverlay = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: none;
  z-index: 2;
`;

const ModalContainer = styled.div`
  position: fixed;
  
  top: ${(props) => (props.isVisible ? "90px" : "-180px")};
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;
  height: 142px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  background: rgba(107, 107, 107, 1); //rgba(0, 0, 0, 0.5)
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: top -3000s ease;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px; /* SearchButton의 크기에 따라 조절 */
  margin: 0 auto;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 450px;
  box-sizing: border-box;
  font-size: 17px;
  color: white;
  border: none;
  border-bottom: 3px solid white;
  outline: none;
  background-color: transparent;
  &::placeholder {
    color: #A3A6A6; /* placeholder 텍스트 색상 설정 */
  }
`;

const SearchButton = styled.button`
  background-color: transparent; /* 기존 배경 색상을 투명하게 변경 */
  background-image: url('./images/search_white.png'); /* 이미지 경로를 설정하세요 */
  background-size: cover;
  background-repeat: no-repeat;
  border: none;
  width: 25px; /* 이미지의 크기에 맞게 조절하세요 */
  height: 25px;
  cursor: pointer;
  margin-left: -35px;
  margin-bottom: 20px;
  position: relative;
  transition: background-color 0.01s ease;

  &:hover {
    background-color: transparent;
  }

  &:active {
    background-color: transparent;
  }
`;

const RecommendedSearchTerm = styled.div`
  cursor: pointer;
  color: white;
  text-align: center;
  margin-top: -20px;
  margin-left: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

export default SearchModal;
