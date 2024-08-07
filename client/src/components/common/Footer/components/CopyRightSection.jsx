import React from 'react';
import styled from 'styled-components';

export default function CopyrightSection({ text }) {
  return (
    <CopyrightContainer>
      <CopyrightWrapper>{text}</CopyrightWrapper>
    </CopyrightContainer>
  );
}

const CopyrightContainer = styled.div`
  padding: 20px 0;
  border-top: 1px solid #424242;
  text-align: center;
  margin: 0;
  margin-top: 20px;
`;

const CopyrightWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
