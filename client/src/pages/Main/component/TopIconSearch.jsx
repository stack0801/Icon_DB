import React, { useEffect, useState } from "react";

export default function TopIconSearch() {
  return (
    <section className="top-icon-search mg-bottom-lv5">
        <div className="container">
            <h2 className="mg-bottom-lv4 pd-none inline-block font-h6 bold">인기 아이콘 검색</h2>
            <div className="row">
                <ul className="col__xs--6 col__lg--2">
                    <li className="font-md mg-bottom-lv3">
                        <a href="#" className="track">교육</a>
                    </li>
                </ul>
                <ul className="col__xs--6 col__lg--2">
                    
                    <li className="font-md mg-bottom-lv3">
                        <a href="#" className="track">사람</a>
                    </li>
                </ul>
                <ul className="col__xs--6 col__lg--2">
                    <li className="font-md mg-bottom-lv3">
                        <a href="#" className="track">음식</a>
                    </li>
                </ul>
                <ul className="col__xs--6 col__lg--2">
                    <li className="font-md mg-bottom-lv3">
                        <a href="#" className="track">집</a>
                    </li>
                </ul>
                <ul className="col__xs--6 col__lg--2">
                    <li className="font-md mg-bottom-lv3">
                        <a href="#" className="track">학교</a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  );
}