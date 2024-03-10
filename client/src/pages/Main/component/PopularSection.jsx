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
    { background: "linear-gradient( 115.78deg, #ABDCFF -7.64%, #0396FF 104.5%)", text: "검은색 테두리" },
    { background: "linear-gradient( 115.74deg, #FDEB71 -7.64%, #F8D800 104.5%)", text: "그라데이션" },
    { background: "linear-gradient( 115.74deg, #FEB692 -7.64%, #EA5455 104.5%)", text: "손 그림" },
    { background: "linear-gradient( 115.74deg, #CE9FFC -7.64%, #7367F0 104.5%)", text: "동물" },
    { background: "linear-gradient( 115.74deg, #81FBB8 -7.64%, #28C76F 104.5%)", text: "사람" },
    { background: "linear-gradient( 115.74deg, #F6CEEC -7.64%, #D939CD 104.5%)", text: "색상" }
  ];

  return (
    <section className="popular-styles pd-top-lv5">
      <div className="container">
        <h2 className="mg-bottom-lv4 pd-none inline-block font-h6 bold">인기 아이콘</h2>
        <div className="row">
            {items.map((item, index) => (
                <div className="col__xs--6 col__sm--4 col__xl--2" key={index}>
                <a href="/" className="track">
                  <div className="popular-styles__item" style={{background: item.background}}>
                    <p className="bold font-lg mg-none">{item.text}</p>
                  </div>
                </a>
              </div>      
            ))}
        </div>
      </div>
    </section>
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
