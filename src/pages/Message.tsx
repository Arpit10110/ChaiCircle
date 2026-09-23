import { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import PeopleIcon from '@mui/icons-material/People';
import ChatIcon from '@mui/icons-material/Chat';
import { io } from "socket.io-client";
import send from "../assets/sending.mp3";
import recive from "../assets/recive.mp3";
import useSound from 'use-sound';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Drawer } from '@mui/material';

interface AllChatdata {
  message: string;
  sender: string;
  users: string[];
}

const Message = () => {
  const socketRef = useRef<any>(null);
  const [IsLoading, SetIsLoading] = useState(false);
  const [Isuser, SetIsUser] = useState(false);
  const [FriendList, SetFriendList] = useState<string[]>([]);
  const [SelectedFriend, SetSelectFriend] = useState("");
  const [SendMessage, SetSendMessage] = useState("");
  const [ALlChat, SetAllChat] = useState<AllChatdata[]>([]);
  const [AdminUsername, SetAdminUsername] = useState("");
  const [OnlineFriends, SetOnlineFriends] = useState<string[]>([]);
  const messageBoxRef = useRef<HTMLDivElement | null>(null);
  const [playsend] = useSound(send);
  const [playrecive] = useSound(recive);
  const [open, setOpen] = useState(false);
  const [Dopen, setDOpen] = useState(false);

  const getuserdata = async () => {
    try {
      SetIsLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_HOST}/getuserdata`, {
        withCredentials: true,
      });
      if (data.success === false) {
        SetIsUser(false);
      } else {
        SetIsUser(true);
        SetAdminUsername(data.adminusername);
        SetFriendList(data.userdata.friends || []);
        setupusers(data.adminusername);
      }
      SetIsLoading(false);
    } catch (error) {
      console.error(error);
      SetIsLoading(false);
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);

  const addmessage = async (sendmessage: string) => {
    SetSendMessage("");
    try {
      await axios.post(
        `${import.meta.env.VITE_HOST}/addmessage`,
        { content: sendmessage, receiver: SelectedFriend },
        { withCredentials: true }
      );
      SetSendMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  const getallmessage = async (i: string) => {
    SetSelectFriend(i);
    setOpen(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/getallmessage`,
        { receiver: i },
        { withCredentials: true }
      );
      SetAllChat(data.messages || []);
      setOpen(false);
    } catch (e) {
      setOpen(false);
      console.error(e);
    }
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [ALlChat]);

  // Socket setup
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_HOST);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const setupusers = (user: string) => {
    socketRef.current.emit("setupuser", user);
    socketRef.current.on("onlineusers", (data: any) => {
      SetOnlineFriends(data || []);
    });
  };

  useEffect(() => {
    const handleReceiveMessage = ({ message, sender }: AllChatdata) => {
      playrecive();
      SetAllChat((prev) => [...prev, { message, sender, users: [] }]);
      scrollToBottom();
    };

    socketRef.current.on("recivemessage", handleReceiveMessage);

    return () => {
      socketRef.current.off("recivemessage", handleReceiveMessage);
    };
  }, []);

  const socketsendmessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!SendMessage.trim()) return;

    SetAllChat((prev) => [
      ...prev,
      { message: SendMessage, sender: AdminUsername, users: [] },
    ]);

    socketRef.current.emit("sendmessage", {
      reciver: SelectedFriend,
      sender: AdminUsername,
      message: SendMessage,
    });

    scrollToBottom();
    playsend();
    addmessage(SendMessage);
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={Dopen}
        onClose={() => setDOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0D0F12",
            color: "#e3e2e5",
            width: "80vw",
            maxWidth: "340px",
            borderRight: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-white/[0.08]">
            <PeopleIcon className="!text-[22px] text-[#ffc174]" />
            <h2 className="text-lg font-bold text-white">Friends ({FriendList.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {FriendList.map((i: string, index: number) => {
              const isOnline = OnlineFriends.includes(i);
              const isSelected = SelectedFriend === i;
              return (
                <div
                  key={index}
                  onClick={() => {
                    getallmessage(i);
                    setDOpen(false);
                  }}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#1f2022] border border-[#f59e0b]/40 text-[#ffc174]"
                      : "bg-[#181B21] border border-white/[0.06] hover:bg-[#1f2022] text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#292a2c] flex items-center justify-center font-bold text-xs text-[#ffc174]">
                      {i.slice(0, 1).toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold">{i}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      isOnline ? "bg-emerald-500/20 text-emerald-400" : "bg-white/[0.05] text-[#64748B]"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>

      {/* Main Container with generous top margin */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 flex flex-col justify-center">
        {IsLoading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loading />
            <p className="mt-4 text-xs text-[#94A3B8]">Loading messenger...</p>
          </div>
        ) : (
          <>
            {Isuser ? (
              <div className="w-full h-[78vh] min-h-[520px] rounded-3xl bg-[#0D0F12] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                {/* Left Sidebar: Contacts (Hidden on small screens) */}
                <div className="hidden md:flex flex-col w-[320px] lg:w-[360px] h-full border-r border-white/[0.08] bg-[#08090B]/60 backdrop-blur-md">
                  
                  {/* Sidebar Header */}
                  <div className="p-5 border-b border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChatIcon className="!text-[22px] text-[#ffc174]" />
                      <h2 className="text-lg font-bold text-white">Direct Messages</h2>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#181B21] border border-white/[0.06] text-xs text-[#ffc174] font-medium">
                      {FriendList.length}
                    </span>
                  </div>

                  {/* Friends List */}
                  <div className="flex-1 overflow-y-auto p-3 space-y-1.5 scroll">
                    {FriendList.length > 0 ? (
                      FriendList.map((i: string, index: number) => {
                        const isOnline = OnlineFriends.includes(i);
                        const isSelected = SelectedFriend === i;
                        return (
                          <div
                            key={index}
                            onClick={() => getallmessage(i)}
                            className={`p-3 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-200 ${
                              isSelected
                                ? "bg-[#181B21] border border-[#f59e0b]/40 shadow-sm"
                                : "hover:bg-[#181B21]/60 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-[#292a2c] flex items-center justify-center font-bold text-xs text-[#ffc174] border border-white/[0.08]">
                                  {i.slice(0, 1).toUpperCase()}
                                </div>
                                {isOnline && (
                                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D0F12]"></span>
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-sm font-semibold ${isSelected ? "text-[#ffc174]" : "text-white"}`}>
                                  {i}
                                </span>
                                <span className="text-[11px] text-[#64748B]">
                                  {isOnline ? "Active in circle" : "Offline"}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                isOnline ? "bg-emerald-500/20 text-emerald-400" : "text-[#64748B]"
                              }`}
                            >
                              {isOnline ? "online" : "offline"}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-12 text-center px-4">
                        <PeopleIcon className="!text-[32px] text-[#64748B] mb-2" />
                        <p className="text-xs text-[#94A3B8]">No friends added yet.</p>
                        <Link
                          to="/addfriends"
                          className="mt-3 inline-block text-xs font-semibold text-[#ffc174] hover:underline"
                        >
                          Find Friends to Chat →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Chat Panel */}
                <div className="flex-1 flex flex-col h-full bg-[#0D0F12]">
                  
                  {/* Top Bar for Mobile & Active Chat */}
                  <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-[#111318]/70 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      {/* Mobile Drawer Trigger */}
                      <button
                        onClick={() => setDOpen(true)}
                        className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181B21] border border-white/[0.08] text-xs font-semibold text-[#ffc174]"
                      >
                        <PeopleIcon className="!text-[16px]" />
                        <span>Friends</span>
                      </button>

                      {SelectedFriend ? (
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#f59e0b]/20 text-[#ffc174] flex items-center justify-center font-bold text-xs">
                            {SelectedFriend.slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-white">{SelectedFriend}</h3>
                            <span className="text-[10px] text-[#94A3B8] flex items-center gap-1">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  OnlineFriends.includes(SelectedFriend) ? "bg-emerald-500" : "bg-gray-500"
                                }`}
                              ></span>
                              {OnlineFriends.includes(SelectedFriend) ? "Online now" : "Offline"}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-[#94A3B8]">No active conversation</span>
                      )}
                    </div>
                  </div>

                  {/* Messages Area */}
                  {SelectedFriend === "" ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f59e0b]/20 to-[#c2841a]/10 flex items-center justify-center text-[#ffc174] mb-3">
                        <ChatIcon className="!text-[32px]" />
                      </div>
                      <h3 className="text-lg font-bold text-white">Select a Friend to Start Chatting</h3>
                      <p className="text-xs text-[#94A3B8] max-w-sm mt-1.5 leading-relaxed">
                        Choose someone from your friend list or search for people in the Add Friends tab to brew real-time conversations.
                      </p>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-between overflow-hidden">
                      
                      {/* Message History Stream */}
                      <div
                        id="messagebox"
                        ref={messageBoxRef}
                        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 scroll"
                      >
                        {ALlChat.map((i: AllChatdata, index: any) => {
                          const isMe = i.sender === AdminUsername;
                          return (
                            <div
                              key={index}
                              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                            >
                              <div
                                className={`max-w-[80%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                                  isMe
                                    ? "bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#ff9837] text-[#2a1700] font-medium rounded-br-none shadow-[0_2px_12px_rgba(245,158,11,0.25)]"
                                    : "bg-[#181B21] border border-white/[0.08] text-[#EDEDED] rounded-bl-none"
                                }`}
                              >
                                {i.message}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Chat Input Form */}
                      <form
                        onSubmit={socketsendmessage}
                        className="p-3 sm:p-4 border-t border-white/[0.08] bg-[#111318]/60 flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={SendMessage}
                          onChange={(e) => SetSendMessage(e.target.value)}
                          placeholder={`Message ${SelectedFriend}...`}
                          className="flex-1 bg-[#181B21] border border-white/[0.08] focus:border-[#f59e0b]/50 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-[#64748B] focus:outline-none transition-colors"
                        />
                        <button
                          type="submit"
                          className="w-10 h-10 rounded-2xl bg-gradient-to-r from-[#ffc174] to-[#f59e0b] text-[#2a1700] flex items-center justify-center hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all shrink-0"
                          title="Send message"
                        >
                          <SendIcon className="!text-[18px]" />
                        </button>
                      </form>

                    </div>
                  )}

                </div>

              </div>
            ) : (
              <div className="py-20 text-center rounded-3xl bg-[#181B21]/80 border border-white/[0.08] p-10 max-w-md mx-auto shadow-2xl">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#f59e0b]/20 to-[#c2841a]/10 flex items-center justify-center text-[#ffc174] mb-4">
                  <span className="material-symbols-outlined text-[32px]">lock</span>
                </div>
                <h3 className="text-xl font-bold text-white">Sign In to Open Messenger</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 mb-6 leading-relaxed">
                  Connect and chat live with friends across your circles.
                </p>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all"
                >
                  Log In to ChaiCircle
                </Link>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Message;