import React from 'react';
import styled from 'styled-components';
import Header from '@_components/common/Header/Header';
import ProfileContainer from '@_components/EditProfilePage/EditProfileContainer';

export default function App() {
  return (
    <>
      <Header />
      <EditProfilePage>
        <ProfileContainer />
      </EditProfilePage>
    </>
  );
}
const EditProfilePage = styled.div`
  padding-top: 55px;
`;
