import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Popular() {
  const [isMobile, setisMobile] = useState();

  useEffect(() => {
    const resizingHandler = () => {
      setisMobile(window.innerWidth <= 768);
    };
    resizingHandler();
    window.addEventListener("resize", resizingHandler);
    return () => {
      window.removeEventListener("resize", resizingHandler);
    };
  }, [isMobile]);

  const items = [
    { background: "linear-gradient( 135deg, #ABDCFF 10%, #0396FF 100%)", text: "검은색 테두리" },
    { background: "linear-gradient( 135deg, #FDEB71 10%, #F8D800 100%)", text: "그라데이션" },
    { background: "linear-gradient( 135deg, #FEB692 10%, #EA5455 100%)", text: "손 그림" },
    { background: "linear-gradient( 135deg, #CE9FFC 10%, #7367F0 100%)", text: "동물" },
    { background: "linear-gradient( 135deg, #81FBB8 10%, #28C76F 100%)", text: "사람" },
    { background: "linear-gradient( 135deg, #F6CEEC 10%, #D939CD 100%)", text: "색상" }
  ];

  return (
    <PopularSection>
      <InnerContainer>
        <Heading>아이콘</Heading>
        <RowFlex>
            {items.map((item, index) => (
                <ItemBox key={index}>
                <a href="/">
                  <Item background={item.background}>
                    <p>{item.text}</p>
                  </Item>
                </a>
              </ItemBox>      
            ))}
        </RowFlex>
      </InnerContainer>
    </PopularSection>
  );
}

const PopularSection = styled.section`
  margin: 0 0 30px;
  padding-top: 50px;
`;

const InnerContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1520px;

  ::after {
    clear: both;
    content: "";
    display: table;
  }
`;

const Heading = styled.h2`
  margin: 20px 0;
  margin-bottom: 30px;
  display: inline-block;
  color: #424242;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;

  @media screen and (min-width: 640px) {
    font-size: 24px;
    line-height: 1.5;
  }
`;

const RowFlex = styled.div`
  margin-left: -15px;
  width: calc(100% + 30px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;

  > div {
    padding: 0 15px;
    margin-bottom: 30px;
  }
`;

const ItemBox = styled.div`
  position: relative;
  margin: 0 0 10px;
  width: 50%;

  @media screen and (min-width: 480px) {
    width: 50%;
  }

  @media screen and (min-width: 640px) {
    width: 33.33333%;
  }
`;

const Item = styled.div`
  position: relative;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(55, 73, 87, 0.1),
    0 15px 30px rgba(55, 73, 87, 0.15);
  transition: all 0.2s ease-in-out;

  background: ${(props) => props.background};
  p {
    padding: 25px 30px 20px;
    position: absolute;
    color: #fff;
    font-size: 17px;
    font-weight: 700;
  }
`;
