import Lpg from "./LandingPage";
import Mpg from "./MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// her app wraps the landin page 
// but we need to chnge thigs as the website becomes multipage

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Lpg/>} />
        <Route path="/main" element={<Mpg/>} />
      </Routes>
    </Router>
  ) 
}

export default App;
