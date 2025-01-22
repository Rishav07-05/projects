// import React from 'react'

const Client = () => {
  return (
    <div className=" w-full overflow-hidden h-[140vh]">
      <h1 className="text-[70px] tracking-tighter leading-none px-20 mt-20">
        Clients reviews
      </h1>
      <div className="border-t-[1px] border-zinc-700 mt-16"></div>

      {/* two divs part */}
      <div className="flex items-start justify-between px-20 mt-10 gap-5 mb-20">
        <div className="oneside">
          <div className=" flex items-start gap-80 text-xl font-light">
            <h1 className="underline">Karman&Venture</h1>
            <h1 className="mb-20">Services:</h1>
          </div>
          <div>
            <div className="text-end">
              <button className="text-center mb-4 font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
                INVESTOR DECK
              </button>
            </div>
            <div className="text-end">
              <button className="text-center font-light px-4 py-[4px] border-zinc-100 border-[1px] rounded-full transition-transform duration-300 hover:bg-zinc-100 hover:text-black hover:scale-105 hover:shadow-lg">
                SALES DECK
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex ml-80 items-center justify-between text-xl ">
          <div>
            <h1 className="mb-[100px] font-light">William Barnes</h1>
            <div className="mb-10">
              <img
                className="rounded-lg object-cover h-36"
                src="https://ochi.design/wp-content/uploads/2023/02/William-Barnes-1-300x300.png"
                alt=""
              />
            </div>
            <h1 className="w-3/4">
              They were transparent about the time and the stages of the
              project. The end product is high quality, and I feel confident
              about how they were handholding the client through the process. I
              feel like I can introduce them to someone who needs to put a sales
              deck together from scratch, and they would be able to handhold the
              client experience from 0 to 100 very effectively from story to
              design. 5/5
            </h1>
          </div>
        </div>
        <a href="#" className="text-zinc-400 text-xl">
          READ
        </a>
      </div>

      {/* footer type part */}
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex text-center items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Planetly
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Nina Walloch</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>

      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Workiz Easy
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Tomer Levy</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Premium Blend
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Ellen Kim</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Hypercare Systems
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Brendan Goss</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Officevibe
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Raff Labrie</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Orderlion
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Stefan Strohmer</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[5%]">
        <a href="" className=" p-10">
          Black Book
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">Jaci Smith</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
      <div className="lines text-xl border-t-[1px] border-zinc-600 border-b-[1px] flex items-center justify-between  w-full h-[4%]">
        <a href="" className="p-10">
          Trawa Energy
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
        <h1 className="p-10">David Budde</h1>
        <a href="" className=" p-10">
          READ
          <div className="w-full border-b-[1px] border-zinc-400"></div>
        </a>
      </div>
    </div>
  );
};

export default Client;
