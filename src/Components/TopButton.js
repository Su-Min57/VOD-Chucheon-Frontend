import React, { Component } from 'react';

class TopButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
      isClicked: false,
    };
  }

  // 맨 위로 스크롤 이동하는 함수
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드러운 스크롤 적용
    });
  };

  // 스크롤 이벤트 핸들러
  handleScroll = () => {
    const scrollY = window.scrollY;

    // 예를 들어, 200px 스크롤되면 버튼을 나타나게 설정
    const showButton = scrollY > 200;

    this.setState({
      showButton,
      isClicked: false, // 스크롤 시 클릭 상태 초기화
    });
  };

  // 컴포넌트가 마운트될 때 스크롤 이벤트 리스너 등록
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  // 컴포넌트가 언마운트될 때 스크롤 이벤트 리스너 해제
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // 버튼 클릭 이벤트 핸들러
  handleClick = () => {
    this.setState({
      isClicked: true,
    });
    this.scrollToTop();
  };

  render() {
    const { showButton, isClicked } = this.state;

    return (
      <button
        onClick={this.handleClick}
        style={{
          ...buttonStyle,
          display: showButton ? 'block' : 'none',
          border: isClicked ? '3px dotted white' : '1px solid rgba(237, 23, 77, 0.8)',
        }}
      > 
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          TOP
        </span>
      </button>
    );
  }
}

const buttonStyle = {
  position: 'fixed',
  bottom: '100px',
  right: '45px',
  padding: '20px',
  cursor: 'pointer',
  color: 'white',
  fontSize: '11px',
  backgroundColor: 'rgba(237, 23, 77, 0.8)',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  border: '2px solid white',  // 외곽선을 하얀색으로 지정
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',  // 그림자 추가
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default TopButton;
