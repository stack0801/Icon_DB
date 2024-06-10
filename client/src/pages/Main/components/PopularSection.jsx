import React, { useEffect, useState } from 'react';

export default function Popular() {
  const [isMobile, setisMobile] = useState();

  useEffect(() => {
    const resizingHandler = () => {
      setisMobile(window.innerWidth <= 768);
    };
    resizingHandler();
    window.addEventListener('resize', resizingHandler);
    return () => {
      window.removeEventListener('resize', resizingHandler);
    };
  }, [isMobile]);

  const items = [
    {
      background: 'linear-gradient( 115.78deg, #ABDCFF -7.64%, #0396FF 104.5%)',
      text: '검은색 테두리',
    },
    {
      background: 'linear-gradient( 115.74deg, #FDEB71 -7.64%, #F8D800 104.5%)',
      text: '그라데이션',
    },
    {
      background: 'linear-gradient( 115.74deg, #FEB692 -7.64%, #EA5455 104.5%)',
      text: '손 그림',
    },
    {
      background: 'linear-gradient( 115.74deg, #CE9FFC -7.64%, #7367F0 104.5%)',
      text: '동물',
    },
    {
      background: 'linear-gradient( 115.74deg, #81FBB8 -7.64%, #28C76F 104.5%)',
      text: '사람',
    },
    {
      background: 'linear-gradient( 115.74deg, #F6CEEC -7.64%, #D939CD 104.5%)',
      text: '색상',
    },
  ];

  return (
    <section className="popular-styles pd-top-lv5">
      <div className="container">
        <h2 className="mg-bottom-lv4 pd-none inline-block font-h6 bold">
          인기 아이콘
        </h2>
        <div className="row">
          {items.map((item, index) => (
            <div className="col__xs--6 col__sm--4 col__xl--2" key={index}>
              <a href="/" className="track">
                <div
                  className="popular-styles__item"
                  style={{ background: item.background }}
                >
                  <p className="bold font-lg mg-none">{item.text}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}