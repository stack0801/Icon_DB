import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function UploadButton({ text }) {
  return (
    <StyledButtonLink to="#" target="_blank" rel="noreferrer noopener">
      {text}
    </StyledButtonLink>
  );
}

const StyledButtonLink = styled(Link)`
  position: relative;
  padding: 0 30px;
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 15px;
  line-height: 44px;
  transition: none;
  background: #000;
  border: none;
  border-radius: 6px;
  color: #fff;
`;
