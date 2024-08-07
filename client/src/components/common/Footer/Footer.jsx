import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../../../styles/_footer.css';
import LogoSection from './components/LogoSection';
import UploadButton from './components/UploadButton';

const COPYRIGHT_TEXT = 'Copyright © 2022 ICONDB';
const UPLOAD_BUTTON_TEXT = '당신의 아이콘을 업로드하세요';

export default function Footer() {
  return (
    <footer id="footer" className="body-footer">
      <div className="container">
        <div className="row mg-none mg-bottom-lv4-i row--vertical-center footer__top">
          <LogoSection />
          <div className="push-right footer__buttons">
            <UploadButton text={UPLOAD_BUTTON_TEXT} />
          </div>
        </div>
        <div className="copyright">
          <div className="row mg-none row--vertical-center">
            <div className="col mg-none pd-none alignl pd-right-lv2-i">
              <div className="row row--vertical-center mg-none">
                <p className="mg-none">{COPYRIGHT_TEXT}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
