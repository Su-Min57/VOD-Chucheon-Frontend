import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterBox>
      <FooterLayout>
        <CompanyInfoLayout>
          <CompanyInfo>LG HelloVision</CompanyInfo>
          <CompanyInfo>대표이사:송구영</CompanyInfo>
          <CompanyInfo>
            서울특별시 마포구 월드컵북로 56길 19 상암디지털드림타워
          </CompanyInfo>
          <CompanyInfo>사업자등록번호 : 117-81-13423</CompanyInfo>
          <CompanyInfo>통신판매업 신고번호 : 2017-서울마포구-0254</CompanyInfo>
          <CompanyInfo>개인정보보호책임자 : 이건호</CompanyInfo>
          <CompanyInfo>고객행복센터 : 1855-1000</CompanyInfo>
          <CompanyInfo>070-7373-1002~3 (무료/ 헬로전화 이용 시)</CompanyInfo>
          <CompanyInfo>080-120-1012 (무료/ 타사 전화 이용 시)</CompanyInfo>
          <CompanyInfo>
            Copyright © 2023 LG HelloVision DX Data School 1th. TEAM R Jja Bae
            Gi All rights reserved.
          </CompanyInfo>
        </CompanyInfoLayout>
      </FooterLayout>
    </FooterBox>
  );
};

const FooterBox = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    bottom: 0px;
    background-color: black;
    width: 100%;
`;

const FooterLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 980px;
  margin: 20px auto 0;
  padding: 0 4%;
  color: pink;
`;

const CompanyInfoLayout = styled.ul`
  display: flex;
  flex-direction: row;
`;

const CompanyInfo = styled.li`
  font-size: 11px;
`;


export default Footer;
