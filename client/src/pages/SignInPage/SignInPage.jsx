import React, { useEffect } from 'react';
import styled from 'styled-components';

import Background from '@_components/ui/Background';
import SigninContainer from '@_pages/SignInPage/components/ContentContainer';

export default function SignInPage() {
  useEffect(() => {
    document.body.classList.add('theme--icondb');
  });
  
  return (
    <StyledContainer>
      <Background />
      <SigninContainer />
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  width: 100vw;
  height: 100vh;
  color: #000;

  @media screen and (min-width: 992px) {
    display: flex;
  }
`;
