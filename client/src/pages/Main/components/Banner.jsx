import React from 'react';
import styled from 'styled-components';
import wallpaper from '@_assets/images/main-wallpaper.png';

export default function Banner() {
  return (
    <BannerSection>
      <InnerContainer>
        <ContentBox>
          <TextSection>
            <Heading>ICON LIBRARY, AVAILABLE FOR FREE</Heading>
            <Sub>
              다양한 포멧의 업로드를 제공하는 <b>ICONDB:</b>
              <br /> SVG, PNG, JPG 포멧
            </Sub>
            <ButtonBox>
              <Button>인기 있는 아이콘 보기</Button>
            </ButtonBox>
          </TextSection>
          <ImageSection>
            <img src={wallpaper} alt="" width="720" height="554" />
          </ImageSection>
        </ContentBox>
      </InnerContainer>
    </BannerSection>
  );
}

const BannerSection = styled.div`
  margin-bottom: 45px;
  padding: 40px 0;
  position: relative;
  min-height: 300px;
  background-color: #f7f7f7;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1520px;

  ::after {
    clear: both;
    content: '';
    display: table;
  }
`;

const ContentBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  @media screen and (max-width: 1400px) {
    padding: 0;
  }
`;

const TextSection = styled.div`
  margin: 0 0 10px;
  padding: 0 5px;
  position: relative;
  max-width: 580px;
  flex: 1;
`;

const Heading = styled.h1`
  margin: 0 0 10px;
  color: #0a152f;
  font-size: 36px;
  line-height: 1.25;

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;

const Sub = styled.p`
  margin: 0 0 20px;
  margin-bottom: 30px;
  color: #5b5b5b;
  font-size: 15px;
  font-weight: 400;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Button = styled.a`
  padding: 0 25px;
  position: relative;
  min-width: 44px;
  height: 44px;
  display: block !important;
  border: none;
  border-radius: 6px;
  background: #9ed1d9;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  line-height: 44px;
  text-align: center;
  text-decoration: none;
  transition: none;
  cursor: pointer;

  :hover {
    background: #7facb3;
  }

  ::after {
    clear: both;
    content: '';
    display: table;
  }
`;

const ImageSection = styled.div`
  position: unset;
  flex: 1;
  margin: 0 0 10px;
  padding: 0 5px;

  img {
    position: absolute;
    top: -40%;
    left: 55%;
    bottom: 0;
    filter: drop-shadow(12px 15px 40px rgba(207, 217, 224, 0.5));
  }
`;
