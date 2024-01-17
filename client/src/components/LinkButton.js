import React from "react";
import styled from "styled-components";

export default function LinkButton({ fontSize, color, onClick, text }) {
  return (
    <Button fontSize={fontSize} color={color} onClick={onClick}>
      {text}
    </Button>
  );
}

const Button = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  transition-duration: 0.3s;
  cursor: pointer;

  font-size: ${({ fontSize }) => fontSize || "18px"};
  color: ${({ color }) => color || "#000"};

  &:hover {
    color: #b8e9f2;
  }
`;
