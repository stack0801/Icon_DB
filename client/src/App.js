import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from './LandingPage'
import LoginPage from './LoginPage';
import RegisterPage  from './RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/sign_in" element={<LoginPage/>} />
        <Route exact path="/sign_up" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
