import { useState, useRef } from "react";
import { SignedIn, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Aurora from "./UI/Aurora";

const Share = () => {
  const { user } = useUser();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        toast.error("Only JPG, PNG, and GIF files are allowed");
        return;
      }
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !caption) return toast.error("Image and caption required!");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("userId", user?.id || "");
    formData.append("userName", user?.fullName || "Anonymous");

    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
        formData
      );
      toast.success("Image posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Upload failed.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignedIn>
      <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-[-2px]">
          <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} speed={1.5} />
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <h1 className="text-4xl font-bitcount font-bold text-[#ff7300] mb-8 text-center">
            Share a Post
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full bg-[#111]/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-[#cfbfa0]/30"
          >

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              className="hidden"
            />

            <div
              onClick={handleFileClick}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFileChange(e.dataTransfer.files[0]);
              }}
              className={`mb-4 w-full border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all
                ${
                  preview
                    ? "h-64 border-transparent"
                    : `h-48 ${
                        isDragging
                          ? "border-[#ff7300] bg-[#ff7300]/10"
                          : "border-[#ff7300]/50 hover:border-[#ff7300]"
                      }`
                }
                ${isLoading ? "pointer-events-none opacity-70" : ""}
              `}
            >
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff7300]"></div>
                </div>
              ) : preview ? (
                <div className="relative w-full h-full group">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium">
                      Click to change image
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-12 w-12 mb-3 transition-colors ${
                      isDragging ? "text-[#ff7300]" : "text-[#cfbfa0]"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p
                    className={`text-center transition-colors ${
                      isDragging ? "text-[#ff7300]" : "text-[#cfbfa0]"
                    }`}
                  >
                    <span className="font-medium">
                      Drag & drop your image here
                    </span>
                    <br />
                    or click to browse files
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Supports: JPG, PNG, GIF • Max 10MB
                  </p>
                </>
              )}
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write your caption..."
              rows={4}
              disabled={isLoading}
              className="w-full p-3 rounded bg-black/70 border border-[#cfbfa0] text-sm mb-4 placeholder:font-bitcount placeholder:text-[#cfbfa0]/50 focus:outline-none focus:ring-1 focus:ring-[#ff7300]"
            />

            <button
              type="submit"
              disabled={isLoading || !preview}
              className={`w-full py-3 rounded-lg font-semibold transition font-josefin text-lg ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : !preview
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-[#ff7300] text-white hover:bg-[#e65c00] hover:shadow-lg"
              }`}
            >
              {isLoading ? "Uploading..." : "Share Your Creation"}
            </button>
          </form>
        </div>
      </div>
    </SignedIn>
  );
};

export default Share;
