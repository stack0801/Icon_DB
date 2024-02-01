import React from "react";
import styled from "styled-components";

export default function TextSection() {
  return (
    <TextContainer>
      <TextBox>
        <h6>Design</h6>
        <p>개성있는 자신만의 디자인을 가진 아이콘을 업로드 해보세요.</p>
      </TextBox>
      <TextBox>
        <h6>Amount of your icon</h6>
        <p>아이콘 업로드 시, 한 번 당 하나의 파일만 업로드 해주세요.</p>
      </TextBox>
      <TextBox>
        <h6>Recommed SVG</h6>
        <p>PNG, JPG 등 다양한 확장자를 이용한 파일을 업로드 할 수 있지만, SVG 형식으로 업로드 하는 것을 추천드립니다.</p>
      </TextBox>
    </TextContainer>
  );
}

const TextContainer = styled.div`
  margin: 0 -12px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const TextBox = styled.div`
  margin: 0 0 24px;
  padding: 0 12px;
  position: relative;
  width: 100%;

  @media screen and (min-width: 480px) {
    width: 100%;
  }

  @media screen and (min-width: 640px) {
    width: 50%;
  }

  @media screen and (min-width: 768px) {
    width: 33.3333333%;
  }

  h6 {
    margin: 20px 0;
    margin-top: 0;
    margin-bottom: 5px;
    padding: 0;
    color: #374957;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
  }

  p {
    color: #5f7d95;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.6;
  }
`;
