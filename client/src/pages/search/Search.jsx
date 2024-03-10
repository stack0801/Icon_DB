import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import EmptySearch from "./components/EmptySearch";
import Header from "@_components/common/Header/Header";
import SearchBox from "@_components/SearchBox";
import TopButton from "@_components/TopButton";

import axios from "axios";

export default function Search() {
  //검색된 Data
  let { keyword } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      url: "/search",
      data: {
        searchbox: keyword,
      },
    }).then((res) => {
      setData(res.data);
    });
  }, [keyword]);

  return (
    <section id="viewport">
      <Header />
      <Container>
        <ListContentBox>
          <ResultSection>
              <ImageListWrapper>
                {data.length === 0 ? (
                    <EmptySearch />
                ) : (
                  data.map((list, idx) => (
                    <div key={idx}>
                      <Link to={"/post/" + list.content_id}>
                        <IconContainer>
                          <IconList
                            src={
                              "https://webservicegraduationproject.s3.amazonaws.com/img/" +
                              list.filename
                            }
                            width="260"
                            alt="no_img"
                          />
                          <ShowTitle>
                            <Text>Show Detail</Text>
                          </ShowTitle>
                        </IconContainer>
                      </Link>
                    </div>
                  ))
                )}
              </ImageListWrapper>
              <TopButton />
          </ResultSection>
        </ListContentBox>
      </Container>
    </section>
  );
}

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: unset;
  display: flex;

  .text__state-9ed1d9 {
    color: #9ed1d9;
  }
`;

const ListContentBox = styled.div`
  width: 100%;
`;

const ResultSection = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  position: relative;
  visibility: visible;

  p {
    margin: 0 0 20px;

    a {
        transition: none;

        &:hover {
            
        color: #03060d;
        }
    }
  }
`;

const SearchHeading = styled.h3`
margin: 20px 0;
  font-size: 36px;
  line-height: 1.25;

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;
const ImageListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5px;
`;

const IconContainer = styled.div`
  height: 260px;

  display: inline-block;

  background-color: #ffffff;
  border: 3px solid #9ed1d9;
  border-radius: 10px;
`;

const IconList = styled.img`
  height: 260px;

  border-radius: 10px;
`;

const ShowTitle = styled.div`
  position: relative;
  top: -264px;
  bottom: 0;
  left: 0;
  width: 260px;
  height: 260px;

  background-color: #9ed1d9;

  opacity: 0;
  transition: 0.5s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;

  text-align: center;

  font-size: 16px;

  transform: translate(-50%, -50%);
`;
