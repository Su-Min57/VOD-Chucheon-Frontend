import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const SearchModal = ({ isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [searchText, setSearchText] = useState('');
  const modalRef = useRef(null);

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


  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContainer ref={modalRef} onClick={handleModalClick}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="찾으시는 검색어를 입력하세요."
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
          >
            검색
          </SearchButton>
        </SearchContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};


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
  top: 90px; /* 조정된 부분: 위쪽 여백을 조정할 수 있습니다. */
  left: 50%;
  transform: translate(-50%, 0);
  width: 100%;    
  height: 150px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.5); //rgba(0, 0, 0, 0.5)
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const SearchContainer = styled.div`
  position: relative;
  width: 100%
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  width: 360px;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border: none;
  border-bottom: 3px solid pink;
  outline: none;
  background-color: transparent;

  &:focus {
    border-bottom: 3px solid #ED174D; /* Change color on focus */
  }
`;

const SearchButton = styled.button`
  background-color: #ED174D;
  color: white;
  border: none;
  padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #C70039;
  }

  &:active {
    background-color: #AA0025;
  }
`;


export default SearchModal;