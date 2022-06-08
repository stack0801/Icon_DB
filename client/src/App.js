import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './page/LandingPage';
import SigninPage from './page/SigninPage';
import SignupPage  from './page/SignupPage';
import SearchingPage  from './SearchingPage';
import PostingPage from './PostingPage';
import PostPage from './page/PostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/searching" element={<SearchingPage/>}/>
        <Route exact path="/posting" element={<PostingPage/>}/>
        <Route exact path="/sign_in" element={<SigninPage/>}/>
        <Route exact path="/sign_up" element={<SignupPage/>} />
        <Route exact path="/post/:id" element={<PostPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
