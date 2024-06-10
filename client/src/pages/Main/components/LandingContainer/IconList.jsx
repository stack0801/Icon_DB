import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function IconList({ icon, refCallback }) {
  return (
    <div>
      <Link to={`/post/${icon.content_id}`}>
        <IconContainer>
          <IconListImage
            src={`https://webservicegraduationproject.s3.amazonaws.com/img/
              ${icon.filename}`}
            alt={icon.message}
            ref={refCallback}
          />
          <ShowTitle>
            <Text>{icon.message}</Text>
          </ShowTitle>
        </IconContainer>
      </Link>
    </div>
  );
}

const IconContainer = styled.div`
  width: 282px;
  height: 282px;
  display: inline-block;
  background: #ffffff;
  border: none;
`;

const IconListImage = styled.img`
  width: 282px;
  height: 282px;
`;

const ShowTitle = styled.div`
  position: relative;
  top: -286px;
  bottom: 0;
  left: 0;
  width: 282px;
  height: 282px;
  background: #f3efef;
  color: #292929;
  opacity: 0;
  transition: 0.5s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: fit-content;
  font-size: 16px;
  transform: translate(-50%, -50%);
  text-align: center;
`;
