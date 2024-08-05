import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from 'styled-components';

import { useScroll } from '@_hooks/useScroll';

export default function ToTopButton() {
  const [isScrolled] = useScroll();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isScrolled && (
      <StyledButton onClick={scrollToTop}>
        <FaArrowUp size="26" color="white" />
      </StyledButton>
    )
  );
}

const StyledButton = styled.button`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem;
  display: flex;
  background: #9ed1d9;
  border: 1.5px solid white;
  border-radius: 50%;
  font-size: 2rem;
  box-shadow: -1px 0 4px rgba(14, 55, 63, 0.15);
  cursor: pointer;

  z-index: 999;
`;
