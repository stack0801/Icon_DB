import React from 'react';
import styled from 'styled-components';

import background from '@_assets/images/watercolor.webp';

export default function Background() {
  return (
    <BackgroundWrapper>
      <BackgroundImage src={background} alt="background image" />
    </BackgroundWrapper>
  );
}

const BackgroundWrapper = styled.div`
  position: relative;
  height: 100%;
  background-color: #f8fafb;
  overflow: hidden;

  @media only screen and (min-width: 992px) {
    width: calc(100% - 480px);
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  filter: brightness(75%);
  object-fit: cover;
  pointer-events: none;
`;
