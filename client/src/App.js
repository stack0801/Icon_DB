import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './LandingPage'
import LoginPage from './LoginPage';
import RegisterPage  from './RegisterPage';
import SearchingPage  from './SearchingPage';
import PostingPage from './PostingPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/searching" element={<SearchingPage/>}/>
        <Route exact path="/posting" element={<PostingPage/>}/>
        <Route exact path="/sign_in" element={<LoginPage/>}/>
        <Route exact path="/sign_up" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
