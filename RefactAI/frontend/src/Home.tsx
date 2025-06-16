import Loader from "./components/Loader"; // Adjust path if needed
import { useState } from "react";
import HomeComponent from "./components/HomeComponent";

const Home = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}
      {!loading && <HomeComponent />}
    </>
  );
};

export default Home;
