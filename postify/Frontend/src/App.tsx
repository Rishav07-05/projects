import { Routes, Route } from "react-router-dom";
import Page from "./Page";
import Dashboard from "./Dashboard";
import Share from "./components/Share";
import Interact from "./components/Interact";
import Mypost from "./components/Mypost";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/share" element={<Share />} />
      <Route path="/interact" element={<Interact />} />
      <Route path="/mypost" element={<Mypost />} />
    </Routes>
  );
};

export default App;
