import React from 'react';
import styled from 'styled-components';

import SearchBox from '@_components/SearchBox';

export default function SearchSection() {
  return (
    <StyledSection>
      <InnerContainer>
        <InnerWrapper>
          <SearchBoxSection>
            <SearchBoxContainer>
              <SearchBoxWrapper>
                <SearchBox />
              </SearchBoxWrapper>
            </SearchBoxContainer>
          </SearchBoxSection>
        </InnerWrapper>
      </InnerContainer>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  box-shadow: 0 0 0 1px #d8d8d8;
  background-color: #fff;
`;

const InnerContainer = styled.div`
  padding: 10px 20px;
`;

const InnerWrapper = styled.div`
  height: 100% !important;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchBoxSection = styled.section`
  flex: 1 1;
  position: relative;
`;

const SearchBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const SearchBoxWrapper = styled(SearchBoxSection)``;
