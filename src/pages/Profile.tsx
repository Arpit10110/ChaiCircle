import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loading from "../components/Loading";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import Footer from "../components/Footer";

interface userdata {
  username: string;
  dp: string;
  name: string;
  friends?: string[];
  _id?: string;
}

interface CommentType {
  username: string;
  comments: string;
}

interface postdatatye {
  comments: CommentType[];
  likes: string[];
  caption: string;
  username: string;
  imageurl: string;
  _id: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [IsLoading, SetIsLoading] = useState(true);
  const [Isuseradmin, SetIsuseradmin] = useState(false);
  const [Userdata, SetUserdata] = useState<userdata>({ username: "", dp: "", name: "" });
  const [Post, SetPost] = useState<postdatatye[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [Adminusername, SetAdminusername] = useState("");
  const [Comentopen, SetComentopen] = useState(false);
  const [Allcoments, SetAllcoments] = useState<CommentType[]>([]);
  const [Addnewcomment, SetAddnewcomment] = useState("");
  const [Selectedpost, SetSelectedpost] = useState("");

  const getprofiledata = async (username: string) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/getprofile`,
        { username: username },
        { withCredentials: true }
      );
      SetAdminusername(data.adminusername);
      SetIsuseradmin(data.isuseradmin);
      SetUserdata(data.userdata);
      SetPost(data.post || []);
      SetIsLoading(false);
    } catch (error) {
      console.error(error);
      SetIsLoading(false);
    }
  };

  const sendfriendreq = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/sendfriendreq`,
        { to: param.id },
        { withCredentials: true }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_HOST}/logout`, {
        withCredentials: true,
      });
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deletepost = async (id: string) => {
    try {
      setOpen(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/deletepost`,
        { postid: id },
        { withCredentials: true }
      );
      toast.success(data.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
      setRefresh(!refresh);
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.error(error);
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
    if (param.id) {
      getprofiledata(param.id);
    }
  }, [param.id, refresh]);

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
        <div className="flex flex-col h-[65vh] p-6">
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
                <h3 className="text-sm font-semibold text-white">No comments yet</h3>
              </div>
            )}
          </div>

          <form
            onSubmit={addnewcomment}
            className="pt-3 border-t border-white/[0.08] flex items-center gap-2 bg-[#181B21] rounded-2xl p-1.5 border border-white/[0.08] focus-within:border-[#f59e0b]/50"
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
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24 relative z-10">
        
        {/* Background ambient glow */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent blur-[120px] rounded-full"></div>

        {IsLoading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loading />
            <p className="mt-4 text-xs text-[#94A3B8]">Loading profile...</p>
          </div>
        ) : (
          <div className="space-y-10">
            
            {/* Profile Header Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0F12] border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Avatar + Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#f59e0b] to-[#ff9837] shadow-[0_0_30px_rgba(245,158,11,0.35)] shrink-0">
                  <img
                    className="w-full h-full object-cover rounded-full bg-[#181B21]"
                    src={Userdata.dp || "https://res.cloudinary.com/dblybkghe/image/upload/v1742805997/defaultprofile_c9wwd3.png"}
                    alt={Userdata.username}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                      {Userdata.username}
                    </h1>
                    <span className="text-[10px] uppercase font-semibold text-[#ffc174] px-2.5 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30">
                      Member
                    </span>
                  </div>

                  {Userdata.name && (
                    <p className="text-sm text-[#94A3B8]">{Userdata.name}</p>
                  )}

                  {/* Stat Chips */}
                  <div className="flex items-center justify-center sm:justify-start gap-6 pt-2">
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-white">{Post.length}</span>
                      <span className="text-[11px] text-[#64748B]">Posts</span>
                    </div>
                    <div className="w-px h-6 bg-white/[0.08]"></div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-white">{Userdata.friends?.length || 0}</span>
                      <span className="text-[11px] text-[#64748B]">Followers</span>
                    </div>
                    <div className="w-px h-6 bg-white/[0.08]"></div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-white">{Userdata.friends?.length || 0}</span>
                      <span className="text-[11px] text-[#64748B]">Following</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {Adminusername === "N/A" ? null : (
                  <>
                    {Isuseradmin ? (
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/createpost/${Userdata._id}`}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all flex items-center gap-1.5"
                        >
                          <AddPhotoAlternateIcon className="!text-[16px]" />
                          <span>New Post</span>
                        </Link>

                        <button
                          onClick={logout}
                          className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#94A3B8] hover:text-white bg-[#181B21] border border-white/[0.08] hover:border-red-500/40 hover:bg-red-500/10 transition-all flex items-center gap-1.5"
                          title="Log out"
                        >
                          <LogoutIcon className="!text-[16px]" />
                          <span>Logout</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {Userdata.friends?.includes(String(Adminusername)) ? (
                          <div className="px-5 py-2 rounded-full bg-[#181B21] border border-[#f59e0b]/40 text-xs font-semibold text-[#ffc174] flex items-center gap-1.5">
                            <HowToRegIcon className="!text-[16px]" />
                            <span>In Your Circle</span>
                          </div>
                        ) : (
                          <button
                            onClick={sendfriendreq}
                            className="px-6 py-2.5 rounded-full text-xs font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all flex items-center gap-1.5"
                          >
                            <PersonAddIcon className="!text-[16px]" />
                            <span>Add Friend</span>
                          </button>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>

            </div>

            {/* Posts Grid Area */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#ffc174] text-[22px]">grid_view</span>
                  Posts & Moments
                </h2>
                <span className="text-xs text-[#64748B]">{Post.length} published</span>
              </div>

              {Adminusername === "N/A" ? (
                <div className="py-16 text-center rounded-3xl bg-[#181B21]/60 border border-white/[0.08] p-8 max-w-md mx-auto">
                  <h3 className="text-base font-semibold text-white">Sign In to View Posts</h3>
                  <p className="text-xs text-[#94A3B8] mt-1 mb-4">
                    Please log in to browse full posts and comments by this user.
                  </p>
                  <Link
                    to="/login"
                    className="inline-block px-6 py-2 rounded-full text-xs font-semibold text-[#2a1700] bg-[#f59e0b] hover:brightness-110"
                  >
                    Log In
                  </Link>
                </div>
              ) : Post && Post.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Post.map((i: postdatatye, index: number) => {
                    const hasLiked = i.likes.includes(Adminusername);
                    return (
                      <div
                        key={index}
                        className="bg-[#181B21] border border-white/[0.08] hover:border-[#f59e0b]/40 rounded-2xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06]">
                          <span className="text-sm font-semibold text-white">
                            {i.username}
                          </span>
                          {Isuseradmin && (
                            <button
                              onClick={() => deletepost(i._id)}
                              className="text-[#64748B] hover:text-red-400 transition-colors p-1"
                              title="Delete post"
                            >
                              <DeleteIcon className="!text-[18px]" />
                            </button>
                          )}
                        </div>

                        <div className="w-full h-64 rounded-xl overflow-hidden bg-[#0D0F12] border border-white/[0.04] flex items-center justify-center">
                          <img
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                            src={i.imageurl}
                            alt="Post media"
                            loading="lazy"
                          />
                        </div>

                        <div className="pt-3.5 mt-2 flex flex-col gap-3">
                          <p className="text-xs sm:text-sm text-[#EDEDED] font-medium leading-relaxed line-clamp-2">
                            {i.caption}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[#94A3B8]">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5">
                                {hasLiked ? (
                                  <button
                                    onClick={() => removelike(i._id)}
                                    className="text-red-500 hover:scale-110 active:scale-95 transition-all"
                                  >
                                    <FavoriteIcon className="!text-[20px]" />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => addlike(i._id)}
                                    className="hover:text-red-400 hover:scale-110 active:scale-95 transition-all"
                                  >
                                    <FavoriteBorderIcon className="!text-[20px]" />
                                  </button>
                                )}
                                <span className="text-xs font-semibold text-white">
                                  {i.likes.length}
                                </span>
                              </div>

                              <button
                                onClick={() => opencommentbox(i.comments, i._id)}
                                className="flex items-center gap-1.5 hover:text-[#ffc174] hover:scale-105 active:scale-95 transition-all"
                              >
                                <ChatBubbleOutlineSharpIcon className="!text-[18px]" />
                                <span className="text-xs font-semibold text-white">
                                  {i.comments.length}
                                </span>
                              </button>
                            </div>

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
                <div className="py-20 text-center rounded-3xl bg-[#181B21]/60 border border-white/[0.08] p-8 max-w-md mx-auto">
                  <div className="w-14 h-14 mx-auto rounded-full bg-[#292a2c] flex items-center justify-center text-[#ffc174] mb-3">
                    <AddPhotoAlternateIcon className="!text-[28px]" />
                  </div>
                  <h3 className="text-lg font-bold text-white">No Posts Yet</h3>
                  <p className="text-xs text-[#94A3B8] mt-1.5">
                    This user hasn't shared any moments with the circle yet.
                  </p>
                </div>
              )}
            </div>

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

export default Profile;
