// import React from 'react'

const Client = () => {
  return (
    <div className=" w-full overflow-hidden">
      <h1 className="text-[70px] tracking-tighter leading-none px-20 mt-20">
        Client's reviews
      </h1>
      <div className="border-t-[1px] border-zinc-700 mt-16"></div>

      <div className="flex items-start justify-between px-20 mt-10 gap-5 h-screen">
        <div className="oneside">
          <div className=" flex items-start gap-80 text-xl font-light">
            <h1 className="underline">Karman Venture</h1>
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
                  <div><h1 className="mb-28">William Barnes</h1>
                  <div className=" rounded-lg"><img className="rounded-lg object-cover h-32" src="https://ochi.design/wp-content/uploads/2023/02/William-Barnes-1-300x300.png" alt="" /></div></div>
              </div>
              <a href="#" className="text-zinc-400 text-xl">
            READ
          </a>
      </div>
    </div>
  );
};

export default Client;
