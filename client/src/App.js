import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './page/LandingPage';
import SigninPage from './page/SigninPage';
import SignupPage  from './page/SignupPage';
import PostPage  from './page/PostPage';
import PostingPage  from './page/PostingPage';
import SearchingPage  from './page/SearchingPage';
import UserPage from './page/UserPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path = "/" element = {<LandingPage/>} />
        <Route exact path = "/searching/:keyword" element={<SearchingPage/>}/>
        <Route exact path = "/posting" element={<PostingPage/>}/>
        <Route exact path = "/sign_in" element={<SigninPage/>}/>
        <Route exact path = "/sign_up" element={<SignupPage/>} />
        <Route exact path = "/post/:id" element={<PostPage/>} />
        <Route exact path = "/user" element={<UserPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
