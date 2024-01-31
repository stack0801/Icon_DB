import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { FiAlertCircle } from "react-icons/fi";


export default function DownloadsSectionComponent() {
  return (
    <DownloadsSection>
        <DownloadsBox>
            <AlertWarning>
                <TextContainer>
                    <p><FiAlertCircle size="18"/>&nbsp;현재 다운받은 아이콘이 없습니다.</p>
                </TextContainer>
            </AlertWarning>
        </DownloadsBox>
    </DownloadsSection>
  );
}

const DownloadsSection = styled.section`
  width: 100%;
  margin-bottom: 2em;
  margin-top: 2em;
  float: left;
  display: block;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 0 1px 0 rgba(0, 0, 0, 0.2);
  clear: both;

  &:last-child {
    margin-right: 0;
  }
`;

const DownloadsBox = styled.div`
  padding: 2em;
`;

const zoomIn = keyframes`
    0% {
        opacity: 0;
        transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
        opacity: 1;
    }

    75% {
        transform: scale3d(1.1, 1.1, 1.1);
    }
`;

const AlertWarning = styled.div`
    background-color: #f5a282;
    color: #fff;
    position: relative;
    margin: 0 0 20px;
    border-radius: 3px 3px 0 0;
    animation: ${zoomIn} .3s linear;
`;

const TextContainer = styled.div`
  padding: 15px 40px 15px 15px;

  p {
    margin: 0 0 0.75em;
    padding: 0;
    display: flex;
    align-items: center;
  }
`;