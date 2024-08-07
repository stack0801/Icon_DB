import React from 'react';
import styled from 'styled-components';

import { colors } from '@_components/theme';
import LogoSection from './components/LogoSection';
import UploadButton from './components/UploadButton';
import CopyrightSection from './components/CopyrightSection';

const COPYRIGHT_TEXT = 'Copyright © 2022 ICONDB';
const UPLOAD_BUTTON_TEXT = '당신의 아이콘을 업로드하세요';

export default function Footer() {
  return (
    <StyledFooter>
      <StyledContainer>
        <StyledWrapper>
          <LogoSection />
          <UploadButton text={UPLOAD_BUTTON_TEXT} />
        </StyledWrapper>
        <CopyrightSection text={COPYRIGHT_TEXT} />
      </StyledContainer>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  margin: 0;
  padding: 50px 0 0;
  font-size: 13px;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.text};
`;

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1520px;
`;

const StyledWrapper = styled.div`
  margin: 0;
  margin-bottom: 30px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
