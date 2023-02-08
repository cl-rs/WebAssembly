import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { useAuthContext } from './hooks/useAuthContext';


// import pages
import Home from "./pages/home/Home"
import Feed from "./pages/feed/Feed"
import Signup from "./pages/signup/Signup"
import Login from "./pages/login/Login"

// import compentns
import Navbar from './components/Navbar';

function App() {
  // we need to destructure auth is ready property from it 
  const {authIsReady} = useAuthContext()
  return (
    <div className="App">
      {authIsReady &&(
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/feed" element = {<Feed/>}/>
      </Routes>
      </BrowserRouter>
      )}
   </div>
  );
}

export default App;
