import React from 'react';
import { useLocation } from 'react-router-dom';

import { useAuth } from '@_hooks/useAuth';
import { useScroll } from '@_hooks/useScroll';

import LogoSection from './components/LogoSection';
import MenuSection from './components/MenuSection';
import UserSection from './components/UserSection';
import AuthSection from './components/AuthSection';
import SearchSection from './components/SearchSection';

import noImage from '@_assets/images/noimage.png';

export default function Header() {
  // const [sign, setSign] = useState(null);
  // const [profiledata, setProfileData] = useState({
  //   profilename: 'admin.png',
  //   nickname: 'admin',
  // });

  // useEffect(() => {
  //   console.log(sign);
  //   axios.post('/get_auth').then((res) => {
  //     let data = res.data;
  //     setSign(data);
  //     axios
  //       .post('/get_profile', {
  //         user: data,
  //       })
  //       .then((res) => {
  //         setProfileData(res.data[0]);
  //       });
  //   });
  // }, []);
  const { authData: sign } = useAuth();
  const scroll = useScroll();

  //Editor Open
  const openEditor = () => {
    window.open(process.env.REACT_APP_URL + ':8000/src/editor/');
  };

  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDetail = location.pathname === '/post';

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
          <LogoSection />
          <MenuSection />
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
                <AuthSection />
              </div>
            </div>
          ) : (
            <UserSection
              avatar={noImage}
              isDetail={isDetail}
            />
          )}
        </div>
      </section>
      <SearchSection />
    </header>
  );
}