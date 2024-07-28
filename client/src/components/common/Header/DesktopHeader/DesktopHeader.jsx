import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { useScroll } from '@/hooks/useScroll';
import SearchSectionComponent from '../components/SearchSection';
import ModalBoxComponent from '../components/ModalBoxComponent';

import SearchBox from '@_components/SearchBox';
import ImageContainer from '../../../ImageContainer';
import LinkButton from '../../../LinkButton';
import logo from '@_assets/brand/logo.svg';

import Avatar from '@_assets/images/noimage.png';

import { FaRegUser } from 'react-icons/fa6';
import { MdMenu } from 'react-icons/md';

export default function DesktopHeader() {
  const [sign, setSign] = useState(null);
  const [profiledata, setProfileData] = useState({
    profilename: 'admin.png',
    nickname: 'admin',
  });

  useEffect(() => {
    console.log(sign);
    axios.post('/get_auth').then((res) => {
      let data = res.data;
      setSign(data);
      axios
        .post('/get_profile', {
          user: data,
        })
        .then((res) => {
          setProfileData(res.data[0]);
        });
    });
  }, []);

  const signOut = () => {
    axios.post('/sign_out').then((res) => {
      console.log(res.data);
      if (res.data === 'success') window.location.href = '/';
    });
  };

  //Editor Open
  const openEditor = () => {
    window.open(process.env.REACT_APP_URL + ':8000/src/editor/');
  };

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  });

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDetail = location.pathname === '/post';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAvatarButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header
      id="header"
      className="header body-header"
      sign={sign}
      isHome={isHome}
      isDetail
    >
      <section className="header--menu" id="header-menu">
        <div className="row row--vertical-center mg-none full-height">
          <a href="/" className="logo track" id="logo">
            <img
              src={logo}
              title="ICONDB 로고"
              className="block"
              alt="ICONDB logo"
            />
          </a>
          <Nav>
            <MenuToggle>
              <div>
                <MdMenu size="20" />
              </div>
            </MenuToggle>
          </Nav>
          {/* <MenuList>
          <li>
            <a href="/posting">
              <LinkButton color="#9ED1D9" text="Posting" />
            </a>
          </li>
          <li>
            <LinkButton text="Edit" onClick={openEditor} />
          </li>
          {sign !== null && (
            <li>
              <Link to={"/profile/" + sign}>
                <ImageContainer
                  src={
                    "https://webservicegraduationproject.s3.amazonaws.com/userprofile/" +
                    profiledata.profilename
                  }
                  alt=""
                  width="45px"
                  height="45px"
                  borderRadius="50%"
                />
              </Link>
            </li>
          )}
        </MenuList> */}
          {sign === null ? (
            <div className="push-right font-sm header--menu__login">
              <div id="gr_user_menu" className="row mg-none">
                {screenWidth > 1400 ? (
                  <div
                    id="gr_not-connected"
                    className="gr_not-connected col--center"
                  >
                    <div className="row row--vertical-center mg-none login-register-buttons-container">
                      <a
                        href="/sign_in"
                        className="btn-login track semibold link-inverted mg-right-lv3"
                      >
                        로그인
                      </a>
                      <a
                        href="/sign_up"
                        className="btn-register bj-button bj-button--sm bj-button--outline bj-button--inverted track"
                      >
                        가입하기
                      </a>
                    </div>
                  </div>
                ) : (
                  <NotConnectedUserBox>
                    <UserLink href="/sign_in">
                      <FaRegUser fill="#000" size="16" />
                    </UserLink>
                  </NotConnectedUserBox>
                )}
              </div>
            </div>
          ) : (
            <UserBox>
              <AvatarBox onClick={handleAvatarButtonClick}>
                <AvatarButton>
                  <img src={Avatar} alt="noimage" />
                </AvatarButton>
                {isModalOpen && (
                  <ModalBoxComponent
                    isModalOpen={isModalOpen}
                    isDetail={isDetail}
                  />
                )}
              </AvatarBox>
            </UserBox>
          )}
        </div>
      </section>
      <SearchSectionComponent />
    </header>
  );
}

const Nav = styled.nav`
  padding: 0 20px;
  flex: 1;
  font-size: 13px;

  @media screen and (max-width: 992px) {
    padding: 0;
    order: 0;
    flex: none;
    font-size: 17px;
  }
`;

const MenuToggle = styled.label`
  margin: 0;
  display: none;
  cursor: pointer;

  @media screen and (max-width: 992px) {
    display: inherit !important;
  }

  div {
    width: 54px;
    height: 20px;
    text-align: center;
  }
`;

const NotConnectedUserBox = styled.div`
  align-self: center;
`;

const UserLink = styled.a`
  display: block;
  cursor: pointer;

  @media screen and (min-width: 1400px) {
    display: none;
  }
`;

const UserBox = styled.div`
  margin-left: auto;
  font-size: 14px;

  ::after {
    transition: opacity 1ms cubic-bezier(1, 0, 0, 1);
    opacity: 0;
    content: '';
  }
`;

const AvatarBox = styled.div`
  padding-right: 14px;
  position: relative;
  line-height: 1.5;
  z-index: 4;

  ::before {
    position: absolute;
    top: 50%;
    right: 2px;
    width: 0;
    height: 0;
    border-left: 4px solid rgba(0, 0, 0, 0);
    border-right: 4px solid rgba(0, 0, 0, 0);
    border-top: 4px solid #fff;
    transform: translateY(-50%);
    content: '';
  }
`;

const AvatarButton = styled.button`
  padding: 0;
  position: relative;
  width: 36px;
  height: 36px;
  border: none;
  outline: none;
  background: none;
  appearance: none;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  img {
    border-radius: 50%;
  }
`;
