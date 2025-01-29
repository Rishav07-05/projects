// import React from 'react'


const Createpost = () => {

  const [isblurred, setIsblurred] = useState(false)

  const handleClick = () => {
    setIsblurred(true);
  }


  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <div className='flex justify-center items-center gap-10'>
        <h1 className="text-4xl font-bold text-emerald-500">You can create your post here</h1>
        <img onClick={handleClick} className={`w-[50px] h-[50px] ${isblurred? "blur-sm opacity-50": "blur-none opacity-100"}`} src="https://www.svgrepo.com/show/13691/plus.svg" alt="" />
      </div>
    </div>
  )
}

export default Createpost
