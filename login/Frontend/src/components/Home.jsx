import { Link } from "react-router-dom"

// import React from 'react'


const Home = () => {
  return (
    <div className="h-screen w-full bg-black">
      <div className="flex justify-between items-center p-10">
        <h1 className="text-4xl text-[lightblue] font-bold font-serif">AUTH</h1>
        <button className="px-9 py-3 rounded-full bg-green-500 border-green-400 font-bold text-zinc-900 text-xl hover:border-green-500 hover:shadow-[0_0_10px_5px_rgba(0,255,0,0.7)] transform translate-all hover:scale-110 ">
          <Link to="/login">Get Started</Link>
      </button>
      </div>
      <div className="flex justify-center items-center p-36">
         <img src="https://imgs.search.brave.com/122-ii9Fur_aBnm-cp9wfFLfxBJSJUsQQaLk0TU05bU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lcmFz/ZWJnLm9yZy9hc3Nl/dHMvaGVyby1pbWcu/cG5n" height={"600px"} width={"400px"} alt="" />
     </div>
    </div>
  )
}

export default Home
