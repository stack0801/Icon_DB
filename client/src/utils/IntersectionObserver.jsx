import { useRef, useCallback } from 'react';

export function useIntersectionObserver(callback, dependencies) {
  const observer = useRef(null);

  const observe = useCallback((node) => {
    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
          }
        });
      });
    }
    if (node) {
      observer.current.observe(node);
    }
  }, dependencies);

  return observe;
}
