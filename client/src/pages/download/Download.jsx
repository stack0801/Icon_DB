import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Header from "@_components/common/Header/Header";
import MenuListComponent from "@_components/ui/MenuListComponent";

export default function Download() {
  return (
    <RootContainer>
      <Header />
      <Container>
        <Wrapper>
            <MenuListComponent />
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

const ProfileSection = styled.section`
  margin-bottom: 2em;
  margin-top: 2em;
  margin-right: 0;
  width: 74.4105871005%;
  display: block;
  border-radius: 4px;
  background-color: #fff;
  float: left;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 0 1px 0 rgba(0, 0, 0, 0.2);
`;

const UserProfileBox = styled.div`
  padding: 2em;
`;

const ProfileBlock = styled.div`
  padding: 2em 0 0;

  ::after {
    clear: both;
    content: "";
    display: table;
  }

  h3 {
    margin-bottom: 1em;
  }
`;

const ProfileCol = styled.div`
  margin-right: 0;
  width: 48.821174201%;
  display: block;
  float: left;
`;

const InputGroupSpan = styled.span`
  position: relative;
  display: block;
  clear: both;

  input[type="text"] {
    margin: 0 0 10px;
    margin-bottom: 0.75em;
    padding: 1em;
    padding-right: 2.4em;
    width: 100%;
    height: auto;
    display: block;
    border: 1px solid #e9eaec;
    border-radius: 3px;
    background-color: #fff;
    color: #5f7d95;
    font-size: 1em;
    line-height: 24px;
    transition: border-color;
    box-sizing: border-box;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06);
    appearance: none;
    user-select: text;

    :hover {
      border-color: #ced0d4;
    }

    :focus {
      border-color: #9ed1d9;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.06),
        0 0 5px rgba(158, 209, 217, 0.7);
      outline: none;

      ~ .reset-input {
        opacity: 1;
      }
    }
  }

  label {
    position: absolute;
    top: 50%;
    left: 1em;
    background-color: #fff;
    color: #b3b3b3;
    font-weight: normal;
    transform: translateY(-50%);
    transition: all 0.2s ease-in-out;
    cursor: text;
    pointer-events: none;
  }

  input.hascontent ~ label {
    color: #0b2239;
    top: 0;
    font-size: 0.8em;
    padding: 0 0.3em;
  }
`;

const InputGroupLink = styled.a`
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
  opacity: 0;
  color: #b3b3b3;
  z-index: 9999;

  :hover {
    color: #9ed1d9;
  }
`;
const ProfileContainer = styled.div`
  display: grid;
  grid-template-rows: 300px 100px 50px 50px 50px;
  place-items: center;
  padding: 10%;
`;

const FavoritePage = styled.div`
  display: grid;
  padding-left: 102px;
`;

const MyList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 30px;
`;

const IconList = styled.img`
  height: 100px;

  border: 2px solid #9ed1d9;
  border-radius: 10px;
`;
