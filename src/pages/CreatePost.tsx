import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Footer from "../components/Footer";

const CreatePost = () => {
  const navigate = useNavigate();
  const [ImageUploaded, SetImageUploaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [Caption, SetCaption] = useState("");
  const [ImageUrl, SetImageUrl] = useState("");

  const handleImageChange = async (e: any) => {
    try {
      setOpen(true);
      let Image = e.target.files?.[0];
      if (!Image) {
        setOpen(false);
        return;
      }
      let data = new FormData();
      data.append("file", Image);
      data.append("upload_preset", "arsheb");
      data.append("cloud_name", "dblybkghe");
      const res = await axios.post("https://api.cloudinary.com/v1_1/dblybkghe/image/upload", data);
      const imageurl = res.data.secure_url;
      setOpen(false);
      SetImageUrl(imageurl);
      SetImageUploaded(true);
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  const submitpost = async (e: any) => {
    e.preventDefault();
    if (!ImageUrl) {
      alert("Please upload an image for your post first!");
      return;
    }
    try {
      setOpen(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/createpost`,
        {
          caption: Caption,
          imageurl: ImageUrl,
        },
        { withCredentials: true }
      );
      setOpen(false);
      navigate(`/${data.profile}`);
    } catch (error) {
      console.error(error);
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090B] text-[#e3e2e5] font-['Geist'] selection:bg-[#f59e0b]/30 selection:text-[#ffc174] flex flex-col">
      <Backdrop
        sx={(theme) => ({ color: '#ffc174', zIndex: theme.zIndex.drawer + 2 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Navbar />

      {/* Main Container with generous top margin */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24 relative z-10">
        
        {/* Atmospheric ambient glow */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-b from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent blur-[120px] rounded-full"></div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B21]/90 border border-white/[0.08] backdrop-blur-md shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              Share a Moment
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F9FA]">
            Brew a New Post
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-2">
            Share what's on your mind, snapshots of your craft, or coffee break moments.
          </p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F12] border border-white/[0.08] shadow-2xl backdrop-blur-xl">
          <form onSubmit={submitpost} className="space-y-6">
            
            {/* Caption Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#ffc174] block">
                Caption & Thoughts
              </label>
              <textarea
                value={Caption}
                onChange={(e) => SetCaption(e.target.value)}
                placeholder="What are you thinking, working on, or brewing today?..."
                className="w-full min-h-[140px] p-4 rounded-2xl bg-[#181B21] border border-white/[0.08] focus:border-[#f59e0b]/50 text-white placeholder:text-[#64748B] text-sm sm:text-base leading-relaxed focus:outline-none transition-colors"
                required
              ></textarea>
            </div>

            {/* Image Upload Zone */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#ffc174] block">
                Post Image
              </label>

              {ImageUploaded && ImageUrl ? (
                <div className="relative rounded-2xl overflow-hidden bg-[#181B21] border border-[#f59e0b]/40 p-4 flex flex-col items-center gap-3">
                  <div className="w-full h-64 rounded-xl overflow-hidden bg-[#08090B]">
                    <img
                      src={ImageUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex items-center justify-between w-full pt-2">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircleIcon className="!text-[18px]" />
                      Image Uploaded Successfully
                    </span>
                    <label className="text-xs text-[#ffc174] hover:underline cursor-pointer font-medium">
                      Change Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="border-2 border-dashed border-white/[0.12] hover:border-[#f59e0b]/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-[#181B21]/50 hover:bg-[#181B21] transition-all cursor-pointer group">
                  <div className="w-14 h-14 rounded-full bg-[#292a2c] flex items-center justify-center text-[#94A3B8] group-hover:text-[#ffc174] group-hover:scale-110 transition-all">
                    <CloudUploadIcon className="!text-[28px]" />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-white group-hover:text-[#ffc174] transition-colors">
                      Click to upload an image
                    </span>
                    <p className="text-xs text-[#64748B] mt-1">PNG, JPG, WebP up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-full text-sm font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#ff9837] shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Publish to Circle</span>
                <ArrowForwardIcon className="!text-[16px]" />
              </button>
            </div>

          </form>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default CreatePost;