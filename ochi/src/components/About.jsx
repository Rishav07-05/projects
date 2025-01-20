// import React from 'react'

const About = () => {
  return (
    <div className="w-full p-20 bg-[#CDEA68] text-black rounded-tl-3xl rounded-tr-3xl">
      <h1 className="font-[Neue Montreal] text-[3vw] leading-[3.5vw] tracking-tight mb-[4.5vw] ">
        Ochi is a strategic presentation agency for forward-thinking businesses
        that need to raise funds, sell products, explain complex ideas, and hire
        great people.
      </h1>
      <div className="border-t-[1px] border-[#424b21] w-full mb-5 "></div>
      <div className="flex  items-start mt-15">
        <p className="ml-20 mr-80">What you can expect: </p>
        <p className="w-1/5 text-xl font-light leading-none ml-80">
          We create tailored presentations to help you persuade your colleagues,
          clients, or investors. Whether its live or digital, delivered for one
                  or a hundred people. <br />
                  <br /><br />
          We believe the mix of strategy and design (with a bit of coffee) is
          what makes your message clear, convincing, and captivating.
        </p>
        <p className="ml-20 mt-14">
          S: <br />
          <a href="" className="underline">Instagram</a> <br />
          <a href="" className="underline">Behance</a> <br />
          <a href="" className="underline">facebook</a> <br />
          <a href="" className="underline">Linkedin</a>
        </p>
      </div>

          <div className="border-t-[1px] border-[#424b21] w-full mt-28 pt-8"></div>
          <div className="w-1/2">
              <h1 className="text-6xl mb-5">Our approach: </h1>
              <button className="flex gap-6 items-center px-7 py-4 bg-zinc-900 rounded-full text-white">Read More
                  <div className="w-3 h-3 bg-zinc-100 rounded-full"></div>
              </button>
          </div>
          <div className="w-1/2 h-[60vh] bg-cyan-400"></div>
    </div>
  );
};

export default About;
