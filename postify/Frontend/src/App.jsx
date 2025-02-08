import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Main from "./components/Main";
import Createpost from "./components/Createpost";
import { Toaster } from "react-hot-toast"; 
import Post from "./components/Post";


const App = () => {
  return (
    <div className="h-screen w-full bg-[#060606]">
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />} />
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/posts" element={< Post />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
