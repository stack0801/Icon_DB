import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function CategorySection() {
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

    return (
        <BannerSection>
            <ItemBox>
                <div>
                    <div className="image-container">
                        <CircleBox>
                        </CircleBox>
                    </div>
                    <div className="text-container">
                        <Heading>아이콘</Heading>
                    </div>
                </div>
            </ItemBox>
        </BannerSection>
    );
}

const BannerSection = styled.section`
    margin: 0 auto;
    padding: 0 20px;
    max-width: 1520px;

    ::after {
        clear: both;
        content: "";
        display: table;
    }
`;

const ItemBox = styled.div`
  margin: 40px auto 50px;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(4, minmax(80px, 200px));
  gap: 30px;
  text-align: center;
`;

const CircleBox = styled.div`
    margin: 0 auto;
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #9ed1d9;
`
const Heading = styled.h6`
    margin: 20px 0;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
    font-size: 17px;
    line-height: 1.6;
`;

const TitleWrapper = styled.div`
  display: grid;
  place-items: center;
`;
