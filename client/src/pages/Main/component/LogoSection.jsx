import React, { useEffect, useState, useRef, useCallback } from "react";

export default function LogoSection() {
  return (
    <section className="container">
      <div className="section-logos">
        <h2 className="font-h5 alignc mg-bottom-lv3">
          다양한 브랜드들의 로고를 찾아보세요
        </h2>
        <p className="font-md paragraph-readable--xs alignc">
          다양한 스타일로 제공되는 브랜드의 로고를 프로젝트에 추가하세요
        </p>
        <div className="row">
            <div>
                <a href="#" className="track">
                    <p className="mg-none font-md">Google</p>
                </a>
            </div>
            <div>
                <a href="#" className="track">
                    <p className="mg-none font-md">Naver</p>
                </a>
            </div>
            <div>
                <a href="#" className="track">
                    <p className="mg-none font-md">Youtube</p>
                </a>
            </div>
            <div>
                <a href="#" className="track">
                    <p className="mg-none font-md">Facebook</p>
                </a>
            </div>
            <div>
                <a href="#" className="track">
                    <p className="mg-none font-md">Instagram</p>
                </a>
            </div>
        </div>

        <a href="#" className="bj-button bj-button--green track alignc">
          더 보기
        </a>
      </div>
    </section>
  );
}
