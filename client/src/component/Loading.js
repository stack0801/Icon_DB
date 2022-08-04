import React from "react";
import {FaSpinner} from "react-icons/fa";
import styled from "styled-components";

// styled-component를 사용하여 Component화, 다른 파일에도 사용 가능
export default function App(){
  //무한스크롤 시 loading 기능
    return( <Loading><FaSpinner className="spinner" size="60px" color="gray"/></Loading> );
}

const Loading = styled.div`
   display: grid;
   place-items: center;
   place-content: center;
  
  .spinner {
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
