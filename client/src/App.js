import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './pages/Main/index';
import SigninPage from './pages/sign-in/SigninPage';
import SignupPage  from './pages/sign-up/SignupPage';
import PostPage  from './pages/PostPage';
import PostingPage  from './pages/PostingPage';
import SearchingPage  from './pages/SearchingPage';
import SearchingTagPage  from './pages/SearchingTagPage';
import EditProfilePage from './pages/EditProfilePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<LandingPage/>} />
        <Route exact path = "/searching/:keyword" element={<SearchingPage/>}/>
        <Route exact path = "/searchingTag/:keyword" element={<SearchingTagPage/>}/>
        <Route exact path = "/posting" element={<PostingPage/>}/>
        <Route exact path = "/sign_in" element={<SigninPage/>}/>
        <Route exact path = "/sign_up" element={<SignupPage/>} />
        <Route exact path = "/post/:url_id" element={<PostPage/>} />
        <Route exact path = "/profile/:user" element={<ProfilePage/>} />
        <Route exact path = "/editprofile" element={<EditProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
