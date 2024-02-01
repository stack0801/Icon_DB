import React from "react";
import styled from "styled-components";

export default function Button({
  width,
  height,
  text,
  fontSize,
  fontWeight,
  onClick,
}) {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 0 20px;
  position: relative;
  min-width: 44px;
  display: inline-block;
  border: none;
  border-radius: 3px;
  outline: none;
  background-color: #9ed1d9;
  color: #fff;
  text-align: center;
  text-decoration: none;
  line-height: 1.6;
  cursor: pointer;
  transition: 0.25s linear;

  width: ${(props) => props.width || "auto"};
  height: ${(props) => props.height || "44px"};
  font-size: ${(props) => props.fontSize || ".9375rem"};
  font-weight: ${(props) => props.fontWeight || "700"};

  > * {
    pointer-events: none;
  }
`;
