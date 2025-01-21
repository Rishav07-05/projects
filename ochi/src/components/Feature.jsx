// import React from 'react'

const Feature = () => {
  return (
    <div className="w-full py-20">
      <div className="w-full px-20 border-b-[1px] pb-20">
        <h1 className="text-8xl font-['Neue Montreal'] tracking-tighter font-bold text-white" >
          Featured projects
        </h1>
      </div>
{/* 1st card */}
      <div className="cardtext flex items-start justify-between px-20 mt-10">
        <div className="card flex flex-col w-full bg-cover bg-no-repeat max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">CARDBOARD SPACESHIP</h1>
          </div>
          <div className=" rounded-2xl h-[48vh] bg-cover w-full bg-[url('https://ochi.design/wp-content/uploads/2024/08/CS_Website_1-663x551.png')] ">
          </div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full mr-2" >BRANDED TEMPLATES</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full mr-2" >SALES DECK</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >SOCIAL MEDIA TEMPLATES</button>
          </div>
        </div>

        <div className="card flex flex-col w-full max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">AH2 & MATTHORN</h1>
          </div>
          <div className="bg-cover bg-[url('https://ochi.design/wp-content/uploads/2024/08/Frame-481692-1-663x551.png')] rounded-2xl h-[48vh] w-full"></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >PITCH DESK</button>
          </div>
        </div>
      </div>
{/* 2nd card */}
      <div className="cardtext flex items-start justify-between px-20 mt-10">
        <div className="card flex flex-col w-full bg-cover bg-no-repeat max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">FYDE</h1>
          </div>
          <div className=" rounded-2xl h-[48vh] bg-cover w-full bg-[url('https://ochi.design/wp-content/uploads/2023/10/Fyde_Illustration_Crypto_2-663x551.png')] ">
          </div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full mr-2" >AUDIT</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full mr-2" >COPYWRITING</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >SALE DECK</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >SLIDES DESIGN</button>
          </div>
        </div>

        <div className="card flex flex-col w-full max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">VISE</h1>
          </div>
          <div className="bg-cover bg-[url('https://ochi.design/wp-content/uploads/2022/09/Vise_front2-663x551.jpg')] rounded-2xl h-[48vh] w-full"></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >AGENCY</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >COMPANY PRESENTATION</button>
          </div>
        </div>
      </div>
{/* 3rd card */}
      <div className="cardtext flex items-start justify-between px-20 mt-10">

        <div className="card flex flex-col w-full bg-cover bg-no-repeat max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">TRAWA</h1>
          </div>
          <div className=" rounded-2xl h-[48vh] bg-cover w-full bg-[url('https://ochi.design/wp-content/uploads/2023/08/Frame-3875-663x551.jpg')] ">
          </div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full mr-2" >BRAND IDENTITY</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full mr-2" >DESIGN RESEARCH</button>
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >INVESTOR DECK</button>
          </div>
        </div>

        <div className="card flex flex-col w-full max-w-[38%]">
          <div className="flex items-center gap-3 py-5">
            <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
            <h1 className="font-['neue montreal']">PREMIUM BLEND</h1>
          </div>
          <div className="bg-cover bg-[url('https://ochi.design/wp-content/uploads/2022/12/PB-Front-4-663x551.png')] rounded-2xl h-[48vh] w-full"></div>
          <div className="pitch mt-5">
            <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full" >BRANDED TEMPLATE</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
