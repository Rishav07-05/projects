const main = () => {
  return (
    <div className="h-screen w-full">
      <div className="p-10 flex items-center justify-between">
        <h1 className="text-4xl text-[lightblue] font-bold font-serif">AUTH</h1>
        <div className="flex items-center  px-5 rounded-md">
          <span className="text-2xl text-white mr-4 font-bold">My Profile</span>
          <div className="w-[50px] h-[50px] bg-emerald-500 rounded-full ">
            <a href=""><h1 className="text-center mt-[6px] font-bold text-3xl">R</h1></a>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h1 className="text-[whitesmoke] font-bold font-serif text-center h-8 border-[1px] border-t-amber-500 border-l-amber-200 border-b-amber-200 border-r-amber-500 rounded-full w-[200px] mt-16"
        style={{
          
        }}
        >Post & Beautify</h1>
      </div>
      <div className="text-center" >
        <h1 className="text-center text-5xl mt-10 mb-1 leading-none text-[whitesmoke] font-bold font-serif" >hello how are u !!!</h1>
        <h1 className="text-center text-5xl mb-8 text-[whitesmoke] font-bold font-serif">Want to share something about yourself</h1>
        <p className="text-red-100 text-center">Best platform to interact with people of your nearby with a modified version of instagram</p>
      </div>
      
    </div>
  );
};

export default main;
