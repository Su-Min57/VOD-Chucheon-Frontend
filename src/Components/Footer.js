import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
      <FooterBox>
        <FooterRightLayout>
          <CompanyInfoLayout>
            <CompanyInfo>LG HelloVision</CompanyInfo>
            <CompanyInfo>대표이사:송구영</CompanyInfo>
            <CompanyInfo>
              서울특별시 마포구 월드컵북로 56길 19 상암디지털드림타워
            </CompanyInfo>
            <CompanyInfo>사업자등록번호 : 117-81-13423</CompanyInfo>
            <CompanyInfo>통신판매업 신고번호 : 2017-서울마포구-0254</CompanyInfo>
          </CompanyInfoLayout>
        </FooterRightLayout>

        <FooterLeftLayout>
        <CompanyInfoLayout>
            <CompanyInfo>개인정보보호책임자 : 이건호</CompanyInfo>
            <CompanyInfo>고객행복센터 : 1855-1000</CompanyInfo>
            <CompanyInfo>070-7373-1002~3 (무료/ 헬로전화 이용 시)</CompanyInfo>
            <CompanyInfo>080-120-1012 (무료/ 타사 전화 이용 시)</CompanyInfo>
            <CompanyInfo>
              Copyright © 2023 LG HelloVision DX Data School 1th. TEAM R Jja Bae
              Gi All rights reserved.
            </CompanyInfo>
          </CompanyInfoLayout>
        </FooterLeftLayout>
      </FooterBox>
  );
};


const FooterBox = styled.div`
  display: flex;
  flex-direction: row; /* 수정: 가로로 배치 */
  justify-content: center; /* 중앙 정렬 추가 */
  position: absolute;
  min-height: 20vh;
  background-color: #181818;
  width: 100%; /* 전체 너비를 사용하도록 수정 */
  margin: 0 auto;
  padding: 0; /* 전체 여백 조절 */
`;

const FooterRightLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%; /* 수정: 오른쪽 레이아웃 너비 조절 */ 
  margin: 20px auto 20px;
  padding: 0 2%;
  color: white;
  align-items: center;
`;

const FooterLeftLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%; /* 수정: 왼쪽 레이아웃 너비 조절 */
  margin: 20px auto 20px;
  padding: 0 2%;
  color: white;
`;

const CompanyInfoLayout = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 0;
  margin-top:10px;
  margin-bottom:10px;
`;

const CompanyInfo = styled.li`
  font-size: 11px;
  margin-top:10px;
  margin-bottom: 10px;
`;


export default Footer;
