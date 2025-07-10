import { useState } from "react";
import {
  Menu,
  X,
  Mail,
  Instagram,
  Linkedin,
  Github,
  Twitter,
} from "lucide-react";
import clsx from "clsx";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>

      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setOpen(!open)}
          className={clsx(
            "w-14 h-32 rounded-r-2xl flex flex-col justify-center items-center cursor-pointer",
            "bg-[#cfbfa0] text-[#000000]",
            "transition-all duration-500 ease-out-expo hover:shadow-2xl",
            "group overflow-hidden relative",
            "border-r border-y border-white/10"
          )}
          aria-label={open ? "Close contacts" : "Open contacts"}
        >
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            {open ? (
              <X
                size={28}
                className="transform transition-all duration-500 group-hover:rotate-180 group-hover:scale-110"
                strokeWidth={2.5}
              />
            ) : (
              <Menu
                size={28}
                className="transform transition-all duration-500 group-hover:rotate-90 group-hover:scale-110"
                strokeWidth={2.5}
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute bottom-4 text-xs font-medium text-white/70 tracking-wider">
            {open ? "" : ""}
          </span>
        </button>
      </div>

      <div
        className={clsx(
          "fixed left-20 top-1/2 -translate-y-1/2 z-40 w-80 md:w-96 h-[420px] rounded-2xl overflow-hidden",
          "transition-all duration-700 ease-out-expo transform-gpu",
          "shadow-2xl",
          open
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 -translate-x-10 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/95 to-[#111111]/90 backdrop-blur-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" />

        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-15 mix-blend-overlay" />

        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_70%,black)] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 h-full flex flex-col p-8">

          <div className="mb-8 group">
            <h2 className="text-3xl font-bold text-center font-michroma tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e0cb9f] via-[#e9710f] to-[#f3d7bf] bg-[length:200%] group-hover:bg-[position:100%] transition-all duration-1000">
                LET'S CONNECT
              </span>
            </h2>
            <div className="mt-3 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full opacity-70 transition-all duration-700 group-hover:w-[120%] group-hover:-ml-[10%] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e0cb9f] via-[#e9710f] to-[#f3d7bf] opacity-20 animate-[shimmer_2s_infinite]" />
            </div>
          </div>


          <ul className="flex-1 space-y-6">
            {[
              {
                icon: <Mail size={20} className="text-cyan-400" />,
                href: "mailto:zorin4x@gmail.com",
                label: "zorin4x@gmail.com",
                color: "cyan",
              },
              {
                icon: <Instagram size={20} className="text-pink-400" />,
                href: "https://instagram.com/_rishavvv.vv_",
                label: "_rishavvv.vv_",
                color: "pink",
              },
              {
                icon: <Linkedin size={20} className="text-blue-400" />,
                href: "https://linkedin.com/in/rishav-kumar-48b779298",
                label: "Rishav",
                color: "blue",
              },
              {
                icon: <Github size={20} className="text-gray-400" />,
                href: "https://github.com/Rishav07-05",
                label: "Rishav07-05",
                color: "gray",
              },
              {
                icon: <Twitter size={20} className="text-sky-400" />,
                href: "https://twitter.com/Rishav_050",
                label: "@Rishav_050",
                color: "sky",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-center group transition-all duration-500 hover:pl-3"
              >
                <div
                  className={clsx(
                    "w-11 h-11 rounded-xl flex items-center justify-center mr-5",
                    "bg-white/5 backdrop-blur-sm border border-white/10",
                    "transition-all duration-500 group-hover:scale-110",
                    {
                      "group-hover:bg-cyan-400/20 group-hover:border-cyan-400/30":
                        item.color === "cyan",
                      "group-hover:bg-pink-400/20 group-hover:border-pink-400/30":
                        item.color === "pink",
                      "group-hover:bg-blue-400/20 group-hover:border-blue-400/30":
                        item.color === "blue",
                      "group-hover:bg-gray-400/20 group-hover:border-gray-400/30":
                        item.color === "gray",
                      "group-hover:bg-sky-400/20 group-hover:border-sky-400/30":
                        item.color === "sky",
                    }
                  )}
                >
                  {item.icon}
                </div>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "text-sm font-medium tracking-wide opacity-90",
                    "transition-all duration-500 transform",
                    "group-hover:translate-x-2 group-hover:opacity-100",
                    {
                      "text-cyan-400 group-hover:text-cyan-300":
                        item.color === "cyan",
                      "text-pink-400 group-hover:text-pink-300":
                        item.color === "pink",
                      "text-blue-400 group-hover:text-blue-300":
                        item.color === "blue",
                      "text-gray-400 group-hover:text-gray-300":
                        item.color === "gray",
                      "text-sky-400 group-hover:text-sky-300":
                        item.color === "sky",
                    }
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={clsx(
              "mt-6 text-xs text-white/60 tracking-wider text-center",
              "transition-all duration-1000 delay-300",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <p className="font-light tracking-widest uppercase">
              Collaborate • Create • Innovate
            </p>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent w-3/4 mx-auto my-3" />
            <p className="text-[0.7rem] font-mono opacity-70">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      {/* <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style> */}
    </>
  );
};

export default Footer;
