import {  useRef } from 'react';

const Createpost = () => {
  // const [isBlurred, setIsBlurred] = useState(false);
  const fileInputRef = useRef(null);

  const handleClick = () => {
    // setIsBlurred(true);
    fileInputRef.current.click(); // Open file dialog
  };

  const handleFileChange = (event) => {
    // setIsBlurred(false); // Remove blur when file is selected
    alert("File Selected:", event.target.files[0]);
  };

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center">
      <div className="flex justify-center items-center gap-10">
        <h1 className="text-4xl font-bold text-emerald-500">You can create your post here</h1>


        <textarea name="" className=' text-[whitesmoke] px-5 py-[1px] border-[1px] border-amber-100  placeholder:text-zinc-700 rounded-xl ' placeholder='write your thoughts here' id=""></textarea>
<img
  onClick={handleClick}
  className={`w-[50px] h-[50px] cursor-pointer transition-all  `}
  src="https://www.svgrepo.com/show/13691/plus.svg"
  alt="Upload"
        />
        <button className='px-6 py-1 mr-10 border-[2px] border-green-500 bg-green-500 hover:shadow-[0_0_40px_5px_rgba(255,255,0,0.7)] rounded-full text-2xl text-white'>Send</button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      </div>
    </div>
  );
};

export default Createpost;
