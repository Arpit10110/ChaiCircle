import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import ExploreIcon from '@mui/icons-material/Explore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import Footer from "../components/Footer";

interface CommentType {
  username: string;
  comments: string;
}

interface PostDataType {
  comments: CommentType[];
  likes: string[];
  caption: string;
  username: string;
  imageurl: string;
  _id: string;
}

const Explore = () => {
  const [ISLoading, SetLoading] = useState(false);
  const [Post, SetPost] = useState<PostDataType[]>([]);
  const [Isuser, SetIsuser] = useState(false);
  const [Adminusername, SetAdminusername] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [Comentopen, SetComentopen] = useState(false);
  const [Allcoments, SetAllcoments] = useState<CommentType[]>([]);
  const [Addnewcomment, SetAddnewcomment] = useState("");
  const [Selectedpost, SetSelectedpost] = useState("");

  const getexploreposts = async () => {
    SetLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST}/explore`, {
        withCredentials: true,
      });
      if (data.success === true) {
        SetPost(data.data);
        SetIsuser(true);
        SetAdminusername(data.adminusername);
      } else {
        SetIsuser(false);
      }
      SetLoading(false);
    } catch (error) {
      console.error(error);
      SetLoading(false);
    }
  };

  const addlike = async (postid: string) => {
    try {
      setOpen(true);
      await axios.post(
        `${import.meta.env.VITE_HOST}/addlike`,
        { postid: postid, userid: Adminusername },
        { withCredentials: true }
      );
      setOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  const removelike = async (postid: string) => {
    try {
      setOpen(true);
      await axios.post(
        `${import.meta.env.VITE_HOST}/removelike`,
        { postid: postid, userid: Adminusername },
        { withCredentials: true }
      );
      setOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  const opencommentbox = (comment: CommentType[], id: string) => {
    SetAllcoments(comment);
    SetComentopen(true);
    SetSelectedpost(id);
  };

  const addnewcomment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!Addnewcomment.trim()) return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/addcomment`,
        {
          postid: Selectedpost,
          userid: Adminusername,
          addcomment: Addnewcomment.trim(),
        },
        { withCredentials: true }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setRefresh(!refresh);
      SetAddnewcomment("");
      SetComentopen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getexploreposts();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-[#08090B] text-[#e3e2e5] font-['Geist'] selection:bg-[#f59e0b]/30 selection:text-[#ffc174] flex flex-col">
      <Backdrop
        sx={(theme) => ({ color: '#ffc174', zIndex: theme.zIndex.drawer + 2 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Modern Comments Dialog */}
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        onClose={() => SetComentopen(false)}
        open={Comentopen}
        PaperProps={{
          sx: {
            backgroundColor: "#0D0F12",
            color: "#e3e2e5",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundImage: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.08), transparent 70%)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        <div className="flex flex-col h-[70vh] p-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffc174] text-[20px]">forum</span>
              Conversation Threads
            </h2>
            <button
              onClick={() => SetComentopen(false)}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <CloseIcon className="!text-[20px]" />
            </button>
          </div>

          {/* Comment List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
            {Allcoments && Allcoments.length > 0 ? (
              Allcoments.map((i: CommentType, index: number) => (
                <div
                  key={index}
                  className="bg-[#181B21] border border-white/[0.06] p-3.5 rounded-2xl flex flex-col gap-1 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#f59e0b]/20 text-[#ffc174] text-xs font-bold flex items-center justify-center">
                      {i.username.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="text-xs font-semibold text-white">{i.username}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#EDEDED] pl-8 leading-relaxed">
                    {i.comments}
                  </p>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#181B21] flex items-center justify-center text-[#64748B] mb-2">
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                </div>
                <h3 className="text-sm font-semibold text-white">No thoughts yet</h3>
                <p className="text-xs text-[#94A3B8] mt-1">Be the first to leave a comment on this post!</p>
              </div>
            )}
          </div>

          {/* Comment Input */}
          <form
            onSubmit={addnewcomment}
            className="pt-3 border-t border-white/[0.08] flex items-center gap-2 bg-[#181B21] rounded-2xl p-1.5 border border-white/[0.08] focus-within:border-[#f59e0b]/50 transition-colors"
          >
            <input
              type="text"
              value={Addnewcomment}
              onChange={(e) => SetAddnewcomment(e.target.value)}
              placeholder="Add a mindful thought..."
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:outline-none"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffc174] to-[#f59e0b] text-[#2a1700] text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:brightness-110 active:scale-95 transition-all"
            >
              <span>Reply</span>
              <SendIcon className="!text-[14px]" />
            </button>
          </form>
        </div>
      </Dialog>

      <Navbar />

      {/* Main Container with generous top margin */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24 relative z-10">
        
        {/* Background ambient radiance */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-b from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent blur-[120px] rounded-full"></div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B21]/90 border border-white/[0.08] backdrop-blur-md shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              Community Stream
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F9FA]">
            Explore Circles & Posts
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            Discover unfiltered thoughts, creative projects, and shared moments across the community.
          </p>
        </div>

        {ISLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loading />
            <p className="mt-4 text-xs text-[#94A3B8]">Loading community moments...</p>
          </div>
        ) : (
          <div>
            {Isuser ? (
              Post && Post.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Post.map((i: PostDataType, index: number) => {
                    const hasLiked = i.likes.includes(Adminusername);
                    return (
                      <div
                        key={index}
                        className="bg-[#181B21] border border-white/[0.08] hover:border-[#f59e0b]/40 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        {/* Post Author Bar */}
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                          <Link
                            to={`/${i.username}`}
                            className="flex items-center gap-2.5 hover:text-[#ffc174] transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#292a2c] flex items-center justify-center font-bold text-[#ffc174] text-xs border border-white/[0.1]">
                              {i.username.slice(0, 1).toUpperCase()}
                            </div>
                            <span className="text-sm font-semibold text-white">
                              {i.username}
                            </span>
                          </Link>
                          <span className="text-[10px] text-[#ffc174] px-2 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30">
                            Circle
                          </span>
                        </div>

                        {/* Post Media Container */}
                        <div className="w-full h-64 rounded-xl overflow-hidden bg-[#0D0F12] border border-white/[0.04] flex items-center justify-center">
                          <img
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            src={i.imageurl}
                            alt="Post media"
                            loading="lazy"
                          />
                        </div>

                        {/* Post Caption & Actions */}
                        <div className="pt-3.5 mt-2 flex flex-col gap-3">
                          <p className="text-xs sm:text-sm text-[#EDEDED] font-medium leading-relaxed line-clamp-2">
                            {i.caption}
                          </p>

                          {/* Action Strip */}
                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[#94A3B8]">
                            <div className="flex items-center gap-4">
                              {/* Likes */}
                              <div className="flex items-center gap-1.5">
                                {hasLiked ? (
                                  <button
                                    onClick={() => removelike(i._id)}
                                    className="text-red-500 hover:scale-110 active:scale-95 transition-all"
                                    title="Unlike"
                                  >
                                    <FavoriteIcon className="!text-[20px]" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addlike(i._id)}
                                    className="hover:text-red-400 hover:scale-110 active:scale-95 transition-all"
                                    title="Like"
                                  >
                                    <FavoriteBorderIcon className="!text-[20px]" />
                                  </button>
                                )}
                                <span className="text-xs font-semibold text-white">
                                  {i.likes.length}
                                </span>
                              </div>

                              {/* Comments */}
                              <button
                                onClick={() => opencommentbox(i.comments, i._id)}
                                className="flex items-center gap-1.5 hover:text-[#ffc174] hover:scale-105 active:scale-95 transition-all"
                                title="Comments"
                              >
                                <ChatBubbleOutlineSharpIcon className="!text-[18px]" />
                                <span className="text-xs font-semibold text-white">
                                  {i.comments.length}
                                </span>
                              </button>
                            </div>

                            {/* Share */}
                            <button
                              onClick={() => {
                                const message = `Check out this post by ${i.username}: ${i.caption} - https://chaicircle.vercel.app/#/${i.username}`;
                                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                                window.open(whatsappUrl, "_blank");
                              }}
                              className="p-1 rounded-lg hover:text-[#ffc174] hover:bg-white/[0.06] transition-colors"
                              title="Share on WhatsApp"
                            >
                              <ShareIcon className="!text-[18px]" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-20 text-center rounded-3xl bg-[#181B21]/60 border border-white/[0.08] p-8 max-w-lg mx-auto">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#292a2c] flex items-center justify-center text-[#ffc174] mb-3">
                    <ExploreIcon className="!text-[28px]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">No Posts in Circle Yet</h3>
                  <p className="text-xs text-[#94A3B8] mt-1.5">
                    Be the one to spark the conversation! Connect with friends or publish a new post.
                  </p>
                </div>
              )
            ) : (
              <div className="py-20 text-center rounded-3xl bg-[#181B21]/80 border border-white/[0.08] p-10 max-w-md mx-auto shadow-2xl">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#f59e0b]/20 to-[#c2841a]/10 flex items-center justify-center text-[#ffc174] mb-4">
                  <span className="material-symbols-outlined text-[32px]">lock</span>
                </div>
                <h3 className="text-xl font-bold text-white">Sign In to Explore Posts</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 mb-6 leading-relaxed">
                  Join the circle to discover stories, connect with friends, and leave comments.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all"
                >
                  Log In to ChaiCircle
                </Link>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Explore;