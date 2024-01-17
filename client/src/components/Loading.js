import React from "react";
import {FaSpinner} from "react-icons/fa";
import styled from "styled-components";

const LoadingSpinner = styled.div`
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

export default function Loading(){
    return( <LoadingSpinner>
      <FaSpinner className = "spinner" size = "60px" color = "gray"/>
      </LoadingSpinner> );
}

