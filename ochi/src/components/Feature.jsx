// import React from 'react'

const Feature = () => {
  return (
    <div className="w-full py-20">
      <div className="w-full px-20 border-b-[1px] pb-20">
        <h1 className="text-8xl font-['Neue Montreal'] tracking-tighter font-bold text-white">
          Featured projects
        </h1>
      </div>
      {/* 1st card */}
      <div className="cardtext  flex items-start justify-between px-20 mt-10">
        <div className="card transition-transform duration-300 transform hover:scale-110 flex flex-col w-full bg-cover bg-no-repeat max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">CARDBOARD SPACESHIP</h1>
          </div>
          <div className=" rounded-2xl h-[48vh] bg-cover w-full bg-[url('https://ochi.design/wp-content/uploads/2024/08/CS_Website_1-663x551.png')] "></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              BRANDED TEMPLATES
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              SALES DECK
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
              SOCIAL MEDIA TEMPLATES
            </button>
          </div>
        </div>

        <div className="card transition-transform duration-300 transform hover:scale-110 flex flex-col w-full max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">AH2 & MATTHORN</h1>
          </div>
          <div className="bg-cover bg-[url('https://ochi.design/wp-content/uploads/2024/08/Frame-481692-1-663x551.png')] rounded-2xl h-[48vh] w-full"></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
              PITCH DESK
            </button>
          </div>
        </div>
      </div>
      {/* 2nd card */}
      <div className="cardtext flex items-start justify-between px-20 mt-10">
        <div className="card transition-transform duration-300 transform hover:scale-110 flex flex-col w-full bg-cover bg-no-repeat max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">FYDE</h1>
          </div>
          <div className=" rounded-2xl h-[48vh] bg-cover w-full bg-[url('https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png')] "></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              AUDIT
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              COPYWRITING
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              SALE DECK
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg ">
              SLIDES DESIGN
            </button>
          </div>
        </div>

        <div className="card transition-transform duration-300 transform hover:scale-110 flex flex-col w-full max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">VISE</h1>
          </div>
          <div className="bg-cover bg-[url('https://ochi.design/wp-content/uploads/2022/09/Vise_front2-663x551.jpg')] rounded-2xl h-[48vh] w-full"></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              AGENCY
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
              COMPANY PRESENTATION
            </button>
          </div>
        </div>
      </div>
      {/* 3rd card */}
      <div className="cardtext flex items-start justify-between px-20 mt-10">
        <div className="card transition-transform duration-300 transform hover:scale-110 flex flex-col w-full bg-cover bg-no-repeat max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">TRAWA</h1>
          </div>
          <div className=" rounded-2xl h-[48vh] bg-cover w-full bg-[url('https://ochi.design/wp-content/uploads/2023/08/Frame-3875-663x551.jpg')] "></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              BRAND IDENTITY
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg mr-2">
              DESIGN RESEARCH
            </button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
              INVESTOR DECK
            </button>
          </div>
        </div>

        <div className="card transition-transform duration-300 transform hover:scale-110 flex flex-col w-full max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">PREMIUM BLEND</h1>
          </div>
          <div className="bg-cover bg-[url('https://ochi.design/wp-content/uploads/2022/12/PB-Front-4-663x551.png')] rounded-2xl h-[48vh] w-full"></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
              BRANDED TEMPLATE
            </button>
          </div>
        </div>
      </div>

      {/* last button part */}
      <div className="mt-32 flex items-center justify-center">
        <button className=" flex border-2 gap-6 items-center  border-t-red-400 border-b-blue-400 border-l-red-400 border-r-blue-400 font-light text-lg  transition-all duration-300 hover:text-green-400 hover:border-green-400 hover:shadow-[0_0_20px_5px_rgba(0,255,0,0.6)] shadow-[0_0_50px_rgba(255,0,0,0.7),0_0_50px_rgba(0,0,255,0.7)] px-7 py-4 bg-transparent rounded-full text-zinc-100">
          VIEW ALL CASE STUDIES
          <div className="w-3 h-3 bg-zinc-100 rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default Feature;
