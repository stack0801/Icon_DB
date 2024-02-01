import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LandingPage from './pages/Main/index';
import SigninPage from './pages/sign-in/SigninPage';
import SignupPage  from './pages/sign-up/SignupPage';
import PostPage  from './pages/PostPage';
import Upload  from './pages/upload/Upload';
import SearchingPage  from './pages/SearchingPage';
import SearchingTagPage  from './pages/SearchingTagPage';
import EditProfilePage from './pages/EditProfilePage';
import Me from './pages/me/Me';
import Download from "@_pages/download/Download";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<LandingPage/>} />
        <Route exact path = "/searching/:keyword" element={<SearchingPage/>}/>
        <Route exact path = "/searchingTag/:keyword" element={<SearchingTagPage/>}/>
        <Route exact path = "/upload" element={<Upload />}/>
        <Route exact path = "/sign_in" element={<SigninPage/>}/>
        <Route exact path = "/sign_up" element={<SignupPage/>} />
        <Route exact path = "/post/:url_id" element={<PostPage/>} />
        <Route exact path = "/profile/me" element={<Me />} />
        <Route exact path = "/profile/my_downloads" element={<Download/>} />
        <Route exact path = "/editprofile" element={<EditProfilePage/>} />
      </Routes>
    </Router>
  );
};
