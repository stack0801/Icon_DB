import React from 'react';
import styled from 'styled-components';

export default function Footer({text}) {
  return (
    <div className="copyright">
      <div className="row mg-none row--vertical-center">
        <div className="col mg-none pd-none alignl pd-right-lv2-i">
          <div className="row row--vertical-center mg-none">
            <p className="mg-none">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
