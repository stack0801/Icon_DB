import React from "react";
import styled from "styled-components";

import '../../../styles/_footer.css';
import logo from '../../../assets/brand/logo.svg';
export default function Footer() {
  return (
    <footer id='footer' className="body-footer">
      <div className="container">
        <div className="row mg-none mg-bottom-lv4-i row--vertical-center footer__top">
          <a href="/" className="logo-icondb">
            <img className="hide-tablet push-center lzy lazyload--done" src={logo} alt='icondb logo'/>
          </a>
          <div className="push-right footer__buttons">
            <div className="row mg-none">
              <a href="#" target="_blank" rel="noreferrer noopener" className="bj-button bj-button--green">
                당신의 아이콘을 업로드하세요
              </a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <div className="row mg-none row--vertical-center">
            <div className="col mg-none pd-none alignl pd-right-lv2-i">
              <div className="row row--vertical-center mg-none">
                <p className="mg-none">
                Copyright © 2022 ICONDB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
