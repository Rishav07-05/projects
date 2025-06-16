import React from "react";
import Navbar from "../components/Navbar";
import Marquee from "../components/Marquee";
import { Typewriter } from "react-simple-typewriter";
import Footer from "../components/Footer";
import { SignInButton, SignUpButton } from "@clerk/clerk-react";
import GoogleGeminiEffectDemo from "../GoogleGeminiEffectDemo";
import { HeroHighlight } from "../components/ui/hero-highlight";
import { Highlight } from "../components/ui/hero-highlight";
import { Link } from "react-router-dom";

// Define the code snippets for the typewriter effect
const codeSnippets: string[] = [
  `// Analyzing time complexity\nfunction binarySearch(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) return mid;\n    arr[mid] < target ? left = mid + 1 : right = mid - 1;\n  }\n  return -1;\n}`,
  `// Optimizing space complexity\nfunction removeDuplicates(arr) {\n  return [...new Set(arr)];\n}`,
  `// AI suggestion: Replace loop with map()\nconst squared = arr.map(x => x * x);`,
  `// Refactor complete \nconst sum = (a, b) => a + b;\nconsole.log(sum(5, 10));`,
];

// Define the interface for the step items in the workflow section
interface StepItem {
  step: string;
  title: string;
  desc: string;
  color: string;
}

// Define the interface for the tech icon properties
interface TechIconProps {
  icon: JSX.Element; // React element for SVG
  top: string;
  left: string;
  size: number;
  rotation: number;
  animationDelay: number;
}

const HomeComponent: React.FC = () => {
  // Hardcoded positions and styles for tech icons with glowing effects
  const techIconPositions: TechIconProps[] = [
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowPython">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#1A374D" floodOpacity="0.8" result="flood" />
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowPython)">
            <path
              fill="#2E6290"
              d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
              transform="translate(0 10.26)"
            ></path>
            <path
              fill="#CCAA00"
              d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.283 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.678-8.084 2.713-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
              transform="translate(0 10.26)"
            ></path>
          </g>
        </svg>
      ),
      top: "15%",
      left: "10%",
      size: 60,
      rotation: -5,
      animationDelay: 0.2,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowJava">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#004D7A" floodOpacity="0.8" result="flood" />
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowJava)">
            <path
              fill="#0074BD"
              d="M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092 0 0 2.871 1.795 6.873 3.351-24.439 10.47-55.308-.607-36.115-5.969zM44.629 84.455s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6 0 0 1.993 2.025 5.132 3.131-29.542 8.64-62.446.68-41.309-6.336z"
            ></path>
            <path
              fill="#B21E1E"
              d="M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58 0 .001-42.731 10.67-22.324 34.187z"
            ></path>
            <path
              fill="#0074BD"
              d="M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171-4.451-1.938 3.899-4.625 6.526-5.192 2.739-.593 4.303-.485 4.303-.485-4.953-3.487-32.013 6.85-13.743 10.42 49.821 9.757 90.817-2.117 77.896-9.073zM49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326 9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958 10.832-5.229 19.644-4.643 19.644-4.643zM90.393 99.493c23.421-12.167 12.591-23.86 5.032-22.285-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725 0-.002.468-.617.468-.617z"
            ></path>
            <path
              fill="#B21E1E"
              d="M76.491 1.587s12.968 12.97-12.303 32.923c-20.266 16.006-4.621 25.13-.007 34.41-10.831-9.167-20.009-14.914-16.766-25.663C53.28 27.406 81.226 22.195 76.491 1.587z"
            ></path>
            <path
              fill="#0074BD"
              d="M52.214 126.021c22.476 1.437 57-.8 57.817-11.436 0 0-1.571 4.032-18.577 7.231-19.186 3.612-42.854 3.191-56.887.874 0 .001 2.875 2.381 17.647 3.331z"
            ></path>
          </g>
        </svg>
      ),
      top: "40%",
      left: "85%",
      size: 60,
      rotation: 10,
      animationDelay: 1,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowC">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#4169E1" floodOpacity="0.8" result="flood" />{" "}
              {/* Deeper blue */}
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowC)">
            <path
              fill="#659AD3"
              d="M115.4 30.7l-48.3-27.8c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4v-55.7c0-1.1-.2-2.3-.9-3.3zm-55.1 8.6c6.3 0 11.4 5.1 11.4 11.4s-5.1 11.4-11.4 11.4-11.4-5.1-11.4-11.4 5.1-11.4 11.4-11.4zm-24.5 60.7c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm24.5 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm24.5 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
            ></path>
          </g>
        </svg>
      ),
      top: "70%",
      left: "20%",
      size: 50,
      rotation: -10,
      animationDelay: 1,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowCpp">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#8B0000" floodOpacity="0.8" result="flood" />{" "}
              {/* Deeper red */}
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowCpp)">
            <path
              fill="#D26383"
              d="M115.4 30.7l-48.3-27.8c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4v-55.7c0-1.1-.2-2.3-.9-3.3zm-55.1 8.6c6.3 0 11.4 5.1 11.4 11.4s-5.1 11.4-11.4 11.4-11.4-5.1-11.4-11.4 5.1-11.4 11.4-11.4zm-24.5 60.7c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm24.5 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3zm24.5 0c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"
            ></path>
            <path
              fill="#9C033A"
              d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
            ></path>
            <path
              fill="#FFFFFF"
              d="M85.3 76.1c-4.2 7.4-12.2 12.4-21.3 12.4-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6z"
            ></path>
            <path d="M82.1 61.8h5.2v-5.3h4.4v5.3h5.3v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4zm18.5 0h5.2v-5.3h4.4v5.3h5.3v4.4h-5.3v5.2h-4.4v-5.2h-5.2v-4.4z"></path>
          </g>
        </svg>
      ),
      top: "25%",
      left: "75%",
      size: 56,
      rotation: 5,
      animationDelay: 0.8,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowJs">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#CCAA00" floodOpacity="0.8" result="flood" />{" "}
              {/* Deeper yellow */}
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowJs)">
            <path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"></path>
            <path
              fill="#252525"
              d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"
            ></path>
          </g>
        </svg>
      ),
      top: "50%",
      left: "15%",
      size: 58,
      rotation: 0,
      animationDelay: 1,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowTs">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#004D7A" floodOpacity="0.8" result="flood" />{" "}
              {/* Deeper blue */}
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowTs)">
            <path
              fill="#007ACC"
              d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H57.16v46.23H45.65V69.26H29.38v-5a49.19 49.19 0 01.14-5.16c.06-.08 10-.12 22-.1h21.81z"
            ></path>
          </g>
        </svg>
      ),
      top: "4%",
      left: "50%",
      size: 55,
      rotation: 12,
      animationDelay: 1,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowRust">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#000000" floodOpacity="0.8" result="flood" />{" "}
              {/* Deep black */}
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowRust)">
            <path
              fill="#000000"
              d="M80.039 48.535c-1.492 0-2.883.402-4.082 1.09l-12.082-6.039c.027-.18.054-.36.054-.549 0-.18-.027-.36-.045-.54l11.883-6.312c1.27.81 2.766 1.26 4.344 1.26 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617-4.207 0-7.617 3.41-7.617 7.617 0 .189.027.369.054.549l-11.883 6.312c-1.27-.81-2.766-1.26-4.344-1.26-4.207 0-7.617 3.41-7.617 7.617 0 4.207 3.41 7.617 7.617 7.617 1.578 0 3.074-.45 4.344-1.26l11.883 6.312a1.47 1.47 0 00-.054.549c0 4.207 3.41 7.617 7.617 7.617 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617z"
            ></path>
            <path
              fill="#A06733"
              d="M113.672 80.039c-4.207 0-7.617 3.41-7.617 7.617 0 4.207 3.41 7.617 7.617 7.617 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617zm-99.344 0c-4.207 0-7.617 3.41-7.617 7.617 0 4.207 3.41 7.617 7.617 7.617 4.207 0 7.617-3.41 7.617-7.617 0-4.207-3.41-7.617-7.617-7.617z"
            ></path>
            <path
              fill="#000000"
              d="M113.672 85.656c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm-99.344 0c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z"
            ></path>
          </g>
        </svg>
      ),
      top: "30%",
      left: "20%",
      size: 60,
      rotation: -80,
      animationDelay: 1,
    },
    {
      icon: (
        <svg viewBox="0 0 128 128" className="w-8 h-8">
          <defs>
            <filter id="glowGo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="3"
                result="blur"
              />
              <feFlood floodColor="#006080" floodOpacity="0.8" result="flood" />{" "}
              {/* Deeper teal */}
              <feComposite in="flood" in2="blur" operator="in" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#glowGo)">
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
          </g>
        </svg>
      ),
      top: "60%",
      left: "70%",
      size: 58,
      rotation: 7,
      animationDelay: 0.5,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />

      <GoogleGeminiEffectDemo />

      {/* first page */}
      <div className="relative w-full h-screen overflow-hidden">
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

              <SignUpButton mode="redirect" forceRedirectUrl="/dashboard">
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
              src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID" // REMINDER: Replace with your actual YouTube video ID
              title="Refact AI Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white">
          {[
            {
              step: "1",
              title: "Analyze Your Code",
              desc: "Our AI scans your codebase to understand structure, style, and complexity.",
              color: "from-green-500 to-green-300",
            },
            {
              step: "2",
              title: "Suggest Improvements",
              desc: "Get real-time refactoring, bug fixes, and optimizations powered by deep learning.",
              color: "from-red-500 to-red-300",
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
          ].map((item: StepItem, i: number) => (
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

      <HeroHighlight className="text-center text-black dark:text-white">
        <div className="flex flex-col items-center justify-center px-4">
          <p className="mt-4 leading-relaxed max-w-2xl text-2xl font-bebas tracking-widest text-gray-600 dark:text-gray-300">
            Intelligent development effortless. Get real-time feedback,
            AI-optimized code suggestions, and clear space-time analysis , all
            designed to help you write cleaner, faster, and more efficient code
            with confidence — powered by <Highlight>Refact AI</Highlight>.
          </p>

          <div className="mt-6 ">
            <Link to="/docs">
              <button className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600  hover:border-none text-black dark:text-black transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </HeroHighlight>

      {/* Integrations Section and Footer */}
      <div className="min-h-screen w-full bg-black px-6 py-24 relative overflow-hidden flex flex-col justify-between">
        {/* Container for floating tech icons */}
        <div className="relative w-full h-[500px] overflow-hidden mb-16">
          <div className="absolute inset-0 pointer-events-none">
            {techIconPositions.map((tech, index) => (
              <div
                key={index}
                className="absolute bg-gray-900/50 border border-gray-700 rounded-lg p-2 flex flex-col items-center justify-center transition-all duration-1000 hover:bg-gray-800/70 hover:border-pink-500/30"
                style={{
                  top: tech.top,
                  left: tech.left,
                  width: `${tech.size}px`,
                  height: `${tech.size}px`,
                  opacity: 0.3 + index * 0.1, // Slightly varied opacity for visual depth
                  transform: `rotate(${tech.rotation}deg)`,
                  animation: `float ${Math.random() * 10 + 10}s ease-in-out ${
                    tech.animationDelay
                  }s infinite both`,
                }}
              >
                {tech.icon}
              </div>
            ))}
          </div>

          {/* Main content centered within the same section */}
          <div className="relative z-10 max-w-3xl mx-auto text-center pt-20">
            <h1 className="text-3xl md:text-4xl font-medium mb-6 font-saira bg-gradient-to-r from-yellow-400 to-pink-500  bg-clip-text text-transparent">
              AI-Powered Code Refactoring for Modern Developers
            </h1>

            <p className="text-lg font-spacegrotesk text-gray-400 mb-10 leading-relaxed">
              Refact AI transforms the way you write code by analyzing your
              logic, evaluating time and space complexity, and delivering
              AI-enhanced, optimized solutions. Whether you're debugging or
              improving performance, our intelligent engine helps you write
              cleaner, faster, and more efficient code—effortlessly.
            </p>

            <div className="flex justify-center gap-4">
              <Link to='/docs'>
                <button className="px-6 py-2 border border-gray-600 hover:border-pink-500 rounded-md text-gray-300 hover:text-pink-400 font-medium transition-colors duration-300">
                  View Documentation
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer, now explicitly positioned below the floating icons container */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
