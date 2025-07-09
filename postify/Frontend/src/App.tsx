import { Routes, Route, BrowserRouter } from "react-router-dom";
import Page from "./Page";
import Dashboard from "./Dashboard";
import Share from "./components/Share";
import Interact from "./components/Interact";
import Mypost from "./components/Mypost";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/share" element={<Share />} />
        <Route path="/interact" element={<Interact />} />
        <Route path="/mypost" element={<Mypost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
