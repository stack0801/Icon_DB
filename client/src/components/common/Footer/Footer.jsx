import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../../../styles/_footer.css';

import LogoSection from './components/LogoSection';
import UploadButton from './components/UploadButton';
import CopyrightSection from './components/CopyrightSection';

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
        <CopyrightSection text={COPYRIGHT_TEXT} />
      </div>
    </footer>
  );
}
