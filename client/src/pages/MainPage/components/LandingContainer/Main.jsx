import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { fetchData } from '@/services/fetchData';
import { useIntersectionObserver } from '@/utils/IntersectionObserver';
import Loading from '@_components/Loading';
import IconList from './IconList';

export default function Main() {
  //무한 스크롤
  const [loading, setLoading] = useState(true);
  const [icons, setIcons] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchData(page)
      .then((newIcons) => {
        setIcons((prevIcons) => [...prevIcons, ...newIcons]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching icons:', error);
        setLoading(false);
      });
  }, [page]);

  const handleLastIconRef = useIntersectionObserver(() => {
    setPage((prevPage) => prevPage + 10);
  }, [loading]);

  return (
    <Page>
      <Container>
        <ImageListWrapper>
          {icons.map((icon, idx) => (
            <IconList
              key={icon.content_id}
              icon={icon}
              ref={idx + 1 === icons.length ? handleLastIconRef : null}
            />
          ))}
        </ImageListWrapper>
        {!loading && <Loading />}
      </Container>
    </Page>
  );
}

const Page = styled.div`
  background-color: #f7ecdc;
`;

const ImageListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 24px;
  justify-items: center;
`;