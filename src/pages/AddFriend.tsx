import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from 'react-router-dom';
import RequestList from "../components/RequestList";
import Loading from "../components/Loading";
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface UserResult {
  _id?: string;
  username: string;
  dp?: string;
  name?: string;
  bio?: string;
}

const AddFriend: React.FC = () => {
  const isuser = localStorage.getItem("token") == null ? false : localStorage.getItem("token");
  const [UserName, SetUserName] = useState("");
  const [Searchdata, SetSearchdata] = useState<UserResult[]>([]);
  const [Message, SetMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [showreqbtn, Setshowreqbtn] = useState(false);
  const [reqdata, Setreqdata] = useState([]);
  const [open, setOpen] = useState(false);
  const [Isloading, SetIsloading] = useState(false);
  const [RequestLoading, SetRequestLoading] = useState(true);

  const finduser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!UserName.trim()) return;
    
    SetIsloading(true);
    setHasSearched(true);
    SetMessage("");
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_HOST}/finduser`, {
        username: UserName.trim()
      });
      SetSearchdata(data.users || []);
      if (!data.users || data.users.length === 0) {
        SetMessage("No members found matching that username.");
      }
    } catch (error) {
      console.error(error);
      SetMessage("Unable to search users right now. Please try again.");
    } finally {
      SetIsloading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const findallreq = async () => {
    try {
      SetRequestLoading(true);
      setOpen(true);
      const { data } = await axios.get(`${import.meta.env.VITE_HOST}/getrequests`, {
        withCredentials: true
      });
      Setreqdata(data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      SetRequestLoading(false);
    }
  };

  useEffect(() => {
    if (isuser === false) {
      Setshowreqbtn(false);
    } else {
      Setshowreqbtn(true);
    }
  }, [isuser]);

  return (
    <div className="min-h-screen bg-[#08090B] text-[#e3e2e5] font-['Geist'] selection:bg-[#f59e0b]/30 selection:text-[#ffc174] flex flex-col">
      <Navbar />

      {/* Main Content Area with generous top margin */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-24 relative z-10">
        
        {/* Background ambient radiance */}
        <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent blur-[120px] rounded-full"></div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B21]/90 border border-white/[0.08] backdrop-blur-md shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              Find Connections
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#F8F9FA]">
            Expand Your Circle
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] mt-3 leading-relaxed">
            Search for friends and creators across the ChaiCircle network to connect, follow, and chat.
          </p>

          {/* Pending Requests Button (If Logged In) */}
          {showreqbtn && (
            <div className="mt-5 flex justify-center">
              <button
                onClick={findallreq}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-[#F8F9FA] bg-[#181B21] border border-white/[0.1] hover:border-[#f59e0b]/40 hover:bg-[#1f2022] hover:text-[#ffc174] transition-all shadow-md active:scale-95"
              >
                <NotificationsActiveIcon className="!text-[18px] text-[#ffc174]" />
                <span>View Friend Requests</span>
              </button>
            </div>
          )}
        </div>

        {/* Modern Glassmorphic Search Form */}
        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={finduser}
            className="relative flex items-center p-1.5 sm:p-2 rounded-2xl bg-[#181B21]/90 border border-white/[0.1] focus-within:border-[#f59e0b]/60 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all"
          >
            <div className="pl-3.5 pr-2 text-[#64748B] flex items-center">
              <SearchIcon className="!text-[22px] text-[#ffc174]" />
            </div>

            <input
              value={UserName}
              onChange={(e) => SetUserName(e.target.value.toLowerCase())}
              className="flex-1 bg-transparent text-[#F8F9FA] placeholder:text-[#64748B] text-sm sm:text-base px-2 py-2 focus:outline-none"
              placeholder="Enter exact username (e.g. arpit, devika, rahul)..."
              type="text"
              required
            />

            <button
              type="submit"
              className="px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Search</span>
              <ArrowForwardIcon className="!text-[16px]" />
            </button>
          </form>

          {/* Quick Search Hints */}
          <div className="mt-3 flex items-center justify-between text-xs text-[#64748B] px-2">
            <span>Tip: Usernames are case-insensitive.</span>
            <span className="flex items-center gap-1">
              <PersonAddIcon className="!text-[14px] text-[#ffc174]" /> Connect with real people
            </span>
          </div>
        </div>

        {/* Results Stream / States */}
        <div className="max-w-2xl mx-auto">
          {Isloading ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <Loading />
              <p className="mt-4 text-xs text-[#94A3B8]">Searching the circle network...</p>
            </div>
          ) : Searchdata.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2 text-xs text-[#94A3B8] font-medium border-b border-white/[0.06] pb-2">
                <span>Matching Members ({Searchdata.length})</span>
                <span className="text-[#ffc174]">Verified profiles</span>
              </div>

              {Searchdata.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#181B21] border border-white/[0.08] hover:border-[#f59e0b]/40 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[#292a2c] border border-white/[0.1] shrink-0 group-hover:border-[#f59e0b]/60 transition-colors">
                      {user.dp ? (
                        <img
                          className="w-full h-full object-cover"
                          src={user.dp}
                          alt={user.username}
                          onError={(e) => {
                            // Fallback if avatar fails
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-[#ffc174] text-base">
                          {user.username.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-[#F8F9FA] group-hover:text-[#ffc174] transition-colors truncate">
                        {user.username}
                      </h3>
                      <p className="text-xs text-[#94A3B8] truncate">
                        ChaiCircle Member
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/${user.username}`}
                    className="ml-4 px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1f2022] hover:bg-gradient-to-r hover:from-[#f59e0b] hover:to-[#c2841a] hover:text-[#2a1700] border border-white/[0.1] hover:border-transparent transition-all shrink-0 active:scale-95 shadow-sm"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          ) : hasSearched ? (
            <div className="py-16 text-center rounded-2xl bg-[#181B21]/60 border border-white/[0.06] p-8">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#292a2c] flex items-center justify-center text-[#94A3B8] mb-3">
                <SearchIcon className="!text-[24px]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F8F9FA]">{Message || "No users found"}</h3>
              <p className="text-xs text-[#94A3B8] mt-1.5 max-w-sm mx-auto">
                Double-check the spelling or invite them to join your circle on ChaiCircle!
              </p>
            </div>
          ) : (
            <div className="py-16 text-center rounded-2xl bg-[#181B21]/40 border border-dashed border-white/[0.08] p-8">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-tr from-[#f59e0b]/20 to-[#c2841a]/10 flex items-center justify-center text-[#ffc174] mb-3">
                <PersonAddIcon className="!text-[28px]" />
              </div>
              <h3 className="text-base font-semibold text-[#F8F9FA]">Ready to find people?</h3>
              <p className="text-xs text-[#94A3B8] mt-1 max-w-sm mx-auto">
                Type any member's username above to explore their profile, discover shared conversations, and connect.
              </p>
            </div>
          )}
        </div>

      </main>

      <RequestList
        RequestLoading={RequestLoading}
        reqdata={reqdata}
        openprop={open}
        onClose={handleClose}
      />
    </div>
  );
};

export default AddFriend;