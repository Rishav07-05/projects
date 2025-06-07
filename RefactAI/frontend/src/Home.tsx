import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import { Typewriter } from "react-simple-typewriter";
import Background3D from "./components/Background3D";
import Footer from "./components/Footer";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";





// import gsap from "gsap";


const codeSnippets = [
  `// Analyzing time complexity\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? left = mid + 1 : right = mid - 1;\n  }\n  return -1;\n}`,

  `// Optimizing space complexity\nfunction removeDuplicates(arr) {\n  return [...new Set(arr)];\n}`,

  `// AI suggestion: Replace loop with map()\nconst squared = arr.map(x => x * x);`,

  `// Refactor complete \nconst sum = (a, b) => a + b;\nconsole.log(sum(5, 10));`,
];




const Home = () => {



  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />

      {/* first page */}
      <div className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <Background3D />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-12 py-16 md:py-20">
          {/* Code block (left) */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0">
            <pre className="text-sm sm:text-base md:text-xl lg:text-2xl font-mono text-[#c9109e] glow-code leading-relaxed whitespace-pre-wrap text-left h-[100px] sm:h-[120px]">
              <Typewriter
                words={codeSnippets}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={50}
                deleteSpeed={30}
                delaySpeed={2000}
              />
            </pre>
          </div>

          {/* Hero Text (right) */}
          <div className="w-full md:w-1/2 text-white text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 md:mb-10 font-bebas tracking-wider">
              <div className="mb-4 md:mb-6">
                <span className="text-[#da3939]">Refactor.</span>{" "}
                <span className="text-[lightblue]">Reimagine.</span>{" "}
                <span className="text-[#278569]">Rebuild</span>
              </div>
              <span className="text-transparent font-doto font-extrabold bg-clip-text bg-gradient-to-b from-yellow-400 to-pink-600">
                Refact AI
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#f3b77b] mb-6 md:mb-10 font-spacegrotesk">
              Your intelligent coding assistant – debug, refactor, and write
              better code with ease.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <SignInButton mode="redirect" forceRedirectUrl="/dashboard">
                <button className="relative overflow-hidden group bg-transparent text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-medium transition-all duration-500 ease-in-out hover:text-white border-2 border-white hover:border-transparent">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      ></path>
                    </svg>
                    Login
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-t from-yellow-400 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110"></span>
                </button>
              </SignInButton>

              <SignUpButton mode="redirect" forceRedirectUrl="/">
                <button className="relative overflow-hidden group bg-transparent text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-medium transition-all duration-500 ease-in-out hover:text-black hover:bg-green-500 border-2 border-white hover:border-transparent">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1 duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      ></path>
                    </svg>
                    Sign Up
                  </span>
                  <span className="absolute inset-0 bg-white group-hover:scale-125 opacity-0 group-hover:opacity-10 transition-all duration-700 rounded-full"></span>
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </div>

      {/* scroller */}
      <Marquee />

      {/* second page */}
      <div className="min-h-screen w-full bg-black px-6 py-24">
        <h2 className="text-white text-center text-4xl md:text-5xl font-extrabold font-bebas leading-snug tracking-wider mb-16">
          How{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-pink-600 font-doto font-extrabold">
            ⚡Refact AI
          </span>{" "}
          Supercharges Your Workflow
        </h2>
        {/* Video Showcase Section */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="aspect-w-16 aspect-h-12 w-full h-[300px] rounded-xl overflow-hidden shadow-lg border border-gray-700">
            <iframe
              src="https://www.youtube.com/embed/44pt8w67S8I?si=9RYM0r33aI_GUYcY"
              title="Refact AI Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Heading */}

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
          {[
            {
              step: "1",
              title: "Analyze Your Code",
              desc: "Our AI scans your codebase to understand structure, style, and complexity.",
              color: "from-yellow-500 to-yellow-300",
            },
            {
              step: "2",
              title: "Suggest Improvements",
              desc: "Get real-time refactoring, bug fixes, and optimizations powered by deep learning.",
              color: "from-pink-500 to-pink-300",
            },
            {
              step: "3",
              title: "One-Click Apply",
              desc: "Seamlessly apply suggestions without leaving your IDE or breaking your flow.",
              color: "from-purple-500 to-purple-300",
            },
            {
              step: "4",
              title: "Master Space & Time",
              desc: "Gain clarity over your space and time complexities effortlessly.",
              color: "from-cyan-500 to-blue-400",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`border border-gray-700 rounded-2xl p-[2px] transition-all duration-300 hover:bg-gradient-to-br hover:${item.color}`}
            >
              <div className="bg-black rounded-2xl p-6 h-full hover:bg-gradient-to-br hover:from-yellow-500/10 hover:to-pink-500/10 transition-all duration-300">
                <div className="text-4xl font-bold mb-4 text-white/50">
                  Step {item.step}
                </div>
                <h3 className="text-2xl font-light mb-3 font-bebas tracking-wide text-white">
                  {item.title}
                </h3>
                <p className="text-gray-300 font-spacegrotesk">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations Section && footer section  */}
      <div className="min-h-screen w-full bg-black px-6 py-24">
        <h2 className="text-white text-center text-4xl md:text-5xl font-extrabold leading-snug tracking-tight mb-4">
          Works With Your Favorite{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-pink-600 font-moon font-extralight">
            Tools
          </span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          Seamlessly integrate Refact AI into your existing workflow
        </p>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {[
            {
              name: "VS Code",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    d="M3.656 47.07S1.07 44.484 0 46.242l3.656 16.484L24.32 64 3.656 65.273 0 81.758c1.07 1.758 3.656-.828 3.656-.828L22.18 66.547 41.601 81.93l9.14-2.11-19.774-17.774 19.774-17.774-9.14-2.11-19.421 15.383zm0 0"
                    fill="#2489CA"
                  ></path>
                  <path
                    d="M24.32 64L3.656 47.07v34.86zm0 0"
                    fill="#1070B3"
                  ></path>
                  <path
                    d="M50.742 79.82l9.14 2.11L90.07 64 59.883 46.07l-9.14 2.11 26.29 15.82zm0 0"
                    fill="#0877B9"
                  ></path>
                  <path
                    d="M59.883 46.07L50.742 48.18l4.555 15.82-4.555 15.82 9.14 2.11 30.188-17.93zm0 0"
                    fill="#3C99D4"
                  ></path>
                </svg>
              ),
            },
            {
              name: "IntelliJ",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    d="M120.746 22.422c-1.383-1.524-3.336-2.375-5.398-2.375H12.648c-2.062 0-4.016.851-5.398 2.375-1.383 1.523-2.086 3.586-1.953 5.668l10.203 92.5c.266 2.418 1.484 4.586 3.375 5.96 1.89 1.375 4.266 1.812 6.547 1.203l37.094-10.375 37.094 10.375c.789.222 1.594.328 2.39.328 1.235 0 2.461-.492 3.586-1.531 1.89-1.375 3.11-3.543 3.375-5.961l10.203-92.5c.133-2.082-.57-4.145-1.953-5.668zm-61.297 90.75L16.25 104.75l-8.906-80.75h95.312l-8.906 80.75-34.203 8.422zm0 0"
                    fill="#0877B9"
                  ></path>
                  <path
                    d="M63.75 28.25c-12.426 0-22.5 10.074-22.5 22.5s10.074 22.5 22.5 22.5 22.5-10.074 22.5-22.5-10.074-22.5-22.5-22.5zm0 35c-6.894 0-12.5-5.606-12.5-12.5s5.606-12.5 12.5-12.5 12.5 5.606 12.5 12.5-5.606 12.5-12.5 12.5zm0 0"
                    fill="#0877B9"
                  ></path>
                </svg>
              ),
            },
            {
              name: "GitHub",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#181616"
                    d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
                  ></path>
                  <path
                    fill="#181616"
                    d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.73c-.288.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.26 3.362c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.557 1.423c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.32-.486c.015.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.14.106c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"
                  ></path>
                </svg>
              ),
            },
            {
              name: "GitLab",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#E24329"
                    d="M126.615 74.594L103.42 13.02c-1.172-3.04-5.72-3.04-6.89 0L73.11 74.594h53.505z"
                  ></path>
                  <path
                    fill="#FC6D26"
                    d="M73.11 74.594L64 51.162 54.89 74.594H73.11z"
                  ></path>
                  <path
                    fill="#FCA326"
                    d="M64 102.322l-22.116-27.728H86.116L64 102.322z"
                  ></path>
                  <path
                    fill="#E24329"
                    d="M24.47 74.594L1.274 13.02c-1.17-3.04-5.72-3.04-6.89 0L24.47 74.594z"
                  ></path>
                  <path
                    fill="#FC6D26"
                    d="M24.47 74.594L64 51.162 39.53 74.594H24.47z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Python",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#3776AB"
                    d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
                    transform="translate(0 10.26)"
                  ></path>
                  <path
                    fill="#FFD43B"
                    d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.283 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.678-8.084 2.713-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
                    transform="translate(0 10.26)"
                  ></path>
                </svg>
              ),
            },
            {
              name: "JavaScript",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#F0DB4F"
                    d="M1.408 1.408h125.184v125.185H1.408z"
                  ></path>
                  <path
                    fill="#323330"
                    d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Java",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#0074BD"
                    d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
                  ></path>
                  <path
                    fill="#EA2D2E"
                    d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
                  ></path>
                  <path
                    fill="#0074BD"
                    d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 10.42 49.821 9.757 90.817-2.117 77.896-9.073zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.229 19.644-4.643 19.644-4.643zM90.393 99.493c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.468-.617.468-.617z"
                  ></path>
                  <path
                    fill="#EA2D2E"
                    d="M76.491 1.587s12.968 12.97-12.303 32.923c-20.266 16.006-4.621 25.13-.007 34.41-10.831-9.167-20.009-14.914-16.766-25.663C53.28 27.406 81.226 22.195 76.491 1.587z"
                  ></path>
                  <path
                    fill="#0074BD"
                    d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "C++",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#D26383"
                    d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"
                  ></path>
                  <path
                    fill="#9C033A"
                    d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"
                  ></path>
                  <path d="M82.1 61.8h5.2v-5.3h4.4v5.3H97v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4zm18.5 0h5.2v-5.3h4.4v5.3h5.3v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4z"></path>
                </svg>
              ),
            },
            {
              name: "Go",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#00ADD8"
                    d="M64.004 25.602c-21.27 0-38.912 17.644-38.912 38.916 0 21.268 17.642 38.912 38.912 38.912 21.272 0 38.912-17.644 38.912-38.912 0-21.272-17.64-38.916-38.912-38.916zm0 69.626c-16.967 0-30.71-13.745-30.71-30.71 0-16.967 13.743-30.71 30.71-30.71 16.965 0 30.708 13.743 30.708 30.71 0 16.965-13.743 30.71-30.708 30.71z"
                  ></path>
                  <path
                    fill="#00ADD8"
                    d="M81.706 53.632h.03c1.33 0 2.31 1.003 2.31 2.305v22.23c0 1.302-.98 2.305-2.31 2.305h-.03c-1.33 0-2.308-1.003-2.308-2.305v-22.23c0-1.302.978-2.305 2.308-2.305zM46.317 53.632h.03c1.33 0 2.308 1.003 2.308 2.305v22.23c0 1.302-.978 2.305-2.308 2.305h-.03c-1.33 0-2.308-1.003-2.308-2.305v-22.23c0-1.302.978-2.305 2.308-2.305z"
                  ></path>
                  <path
                    fill="#00ADD8"
                    d="M64.004 53.632h.03c1.33 0 2.308 1.003 2.308 2.305v22.23c0 1.302-.978 2.305-2.308 2.305h-.03c-1.33 0-2.308-1.003-2.308-2.305v-22.23c0-1.302.978-2.305 2.308-2.305z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Rust",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#000"
                    d="M80.039 48.535c-1.492 0-2.883.402-4.082 1.09l-12.082-6.039c.027-.18.054-.36.054-.549 0-.18-.027-.36-.045-.54l11.883-6.312c1.27.81 2.766 1.26 4.344 1.26 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617-4.207 0-7.617 3.41-7.617 7.617 0 .189.027.369.054.549l-11.883 6.312c-1.27-.81-2.766-1.26-4.344-1.26-4.207 0-7.617 3.41-7.617 7.617 0 4.207 3.41 7.617 7.617 7.617 1.578 0 3.074-.45 4.344-1.26l11.883 6.312a1.47 1.47 0 00-.054.549c0 4.207 3.41 7.617 7.617 7.617 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617z"
                  ></path>
                  <path
                    fill="#DEA584"
                    d="M113.672 80.039c-4.207 0-7.617 3.41-7.617 7.617 0 4.207 3.41 7.617 7.617 7.617 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617zm-99.344 0c-4.207 0-7.617 3.41-7.617 7.617 0 4.207 3.41 7.617 7.617 7.617 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617z"
                  ></path>
                  <path
                    fill="#000"
                    d="M113.672 85.656c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm-99.344 0c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Docker",
              icon: (
                <svg viewBox="0 0 128 128" className="w-12 h-12">
                  <path
                    fill="#066DA5"
                    d="M111.782 55.473c-1.707-1.054-4.06-1.774-6.758-1.774-1.508 0-2.93.22-4.184.607-.203-1.6-.338-3.362-.338-5.11 0-3.473.744-6.812 1.744-8.723l-3.587-2.172-2.398 3.524c-2.398 3.473-3.793 9.185-3.793 15.812 0 5.11.744 9.524 1.744 11.812-1.183.575-2.55.88-3.928.88-4.06 0-7.118-2.172-8.423-5.643-.338-.88-.575-1.83-.744-2.813-.17-.88-.27-1.83-.27-2.813 0-1.6.27-3.15.744-4.523l-2.55-1.492-1.83 2.813c-2.398 3.744-3.658 8.423-3.658 13.017 0 7.118 2.883 13.017 7.458 15.525 1.354.744 2.883 1.154 4.523 1.154 1.154 0 2.308-.203 3.387-.575 1.154-.37 2.308-.88 3.387-1.492 9.86-5.643 12.068-19.1 12.068-19.1s9.86-.07 14.1-6.49c0 0 1.354-2.172 1.016-4.86zm-60.78-24.5l-3.658 2.172v5.11h-5.11v-3.658l-3.658 2.172v5.11h-5.11v-3.658l-3.658 2.172v13.017h22.194V33.985zm0 22.194h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm10.22 10.22h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm10.22 10.22h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm10.22 10.22h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm10.22 10.22h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11zm-10.22 0h-5.11v-5.11h5.11v5.11z"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Kubernetes",
              icon: (
                <svg
                  viewBox="0 0 128 128"
                  className="w-12 h-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M64 0l11.31 21.97 24.69 3.59-17.9 17.45 4.23 24.63L64 57.27l-22.33 11.37 4.23-24.63-17.9-17.45 24.69-3.59L64 0z"
                    fill="#326CE5"
                  />
                </svg>
              ),
            },
          ].map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 border border-gray-800 rounded-xl hover:bg-gray-900/50 hover:border-pink-500/50 transition-all"
            >
              <div className="text-4xl mb-4">{tech.icon}</div>
              <h4 className="text-white font-medium">{tech.name}</h4>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
