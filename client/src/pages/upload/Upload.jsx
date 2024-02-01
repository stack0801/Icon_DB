import React from "react";
import styled from "styled-components";

import Header from "@_components/common/Header/Header";
import UploadSectionComponent from "@_pages/upload/component/UploadSection";

export default function Upload() {
  return (
    <RootContainer>
      <Header />
      <Container>
        <Wrapper>
          <UploadSectionComponent />
        </Wrapper>
      </Container>
    </RootContainer>
  );
}

const RootContainer = styled.div`
  background-color: #f8fafb;
  min-height: 100vh;
  display: flex !important;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
`;

const Wrapper = styled.div`
  margin: auto;
  margin-top: 20px;
  padding: 0 20px;
  max-width: 1200px;

  ::after {
    clear: both;
    content: "";
    display: table;
  }
`;
