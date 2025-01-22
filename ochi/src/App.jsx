import About from "./components/About"
import Client from "./components/Client"
import Eyes from "./components/Eyes"
import Feature from "./components/Feature"
import LandingPage from "./components/LandingPage"
import Marquee from "./components/Marquee"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Navbar />
      <LandingPage />
      <Marquee />
      <About />
      <Eyes />
      <Feature />
      <Client />
    </div>
  )
}

export default App
