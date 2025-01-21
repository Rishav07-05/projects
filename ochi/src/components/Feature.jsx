// import React from 'react'

const Feature = () => {
  return (
    <div className="w-full py-20">
      <div className="w-full px-20 border-b-[1px] pb-20">
        <h1 className="text-8xl font-['Neue Montreal'] tracking-tighter">
          Featured projects
        </h1>
      </div>
      <div className="cardtext flex items-start">
        <div className="flex items-center gap-3 px-20 py-20">
          <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
          <h1 className="font-['neue montreal']">CARDBOARD SPACESHIP</h1>
        </div>
        <div className="flex items-center gap-3 px-20 py-20 ml-[420px]">
          <div className="w-3 h-3 rounded-full bg-zinc-100"></div>
          <h1 className="font-['neue montreal']">AH2 & MATTHORN</h1>
        </div>
      </div>
    </div>
  );
};

export default Feature;
