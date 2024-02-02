import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Main from './pages/Main/Main';
import Signin from './pages/sign-in/Signin';
import Signup  from './pages/sign-up/Signup';
import Detail  from './pages/detail/Detail';
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
        <Route exact path = "/" element = {<Main />} />
        <Route exact path = "/searching/:keyword" element={<SearchingPage/>}/>
        <Route exact path = "/searchingTag/:keyword" element={<SearchingTagPage/>}/>
        <Route exact path = "/upload" element={<Upload />}/>
        <Route exact path = "/sign_in" element={<Signin />}/>
        <Route exact path = "/sign_up" element={<Signup />} />
        <Route exact path = "/post" element={<Detail />} />
        <Route exact path = "/profile/me" element={<Me />} />
        <Route exact path = "/profile/my_downloads" element={<Download/>} />
        <Route exact path = "/editprofile" element={<EditProfilePage/>} />
      </Routes>
    </Router>
  );
};
