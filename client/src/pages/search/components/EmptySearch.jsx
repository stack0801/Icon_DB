import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

import axios from "axios";

export default function EmptySearch() {
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
    <div className="empty-search">
      <div>
        <SearchHeading>
          죄송합니다,&nbsp;
          <span className="text__state-9ed1d9">{keyword}</span>아이콘과 일치하는 결과를
          찾지 못했습니다
        </SearchHeading>

        <p>
          다른 단어를 검색해 보시거나&nbsp;
          <a href="/" className="text__state-9ed1d9">
            홈
          </a>
          으로 돌아가세요
        </p>
      </div>
    </div>
  );
}

const SearchHeading = styled.h3`
  margin: 20px 0;
  font-size: 36px;
  line-height: 1.25;

  @media screen and (min-width: 768px) {
    font-size: 40px;
  }
`;
