import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { isauth } from '../middleware/isauth';
import { Drawer } from "@mui/material";

const Navbar = () => {
  const isuser = localStorage.getItem("token") == null ? false : localStorage.getItem("token");
  const [User, SetUser] = useState(isuser);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const finduservalid = async () => {
      const data = await isauth();
      SetUser(data);
    };
    finduservalid();
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: <HomeIcon className="!text-[20px]" /> },
    { name: "Explore", path: "/explore", icon: <ExploreIcon className="!text-[20px]" /> },
    { name: "Add Friends", path: "/addfriends", icon: <PersonSearchIcon className="!text-[20px]" /> },
    { name: "Messages", path: "/message", icon: <ChatIcon className="!text-[20px]" /> },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-50 bg-[#08090B]/85 backdrop-blur-xl border-b border-white/[0.08] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#c2841a] p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#08090B] rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="/stitch/asset_1.png"
                  alt="ChaiCircle"
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    // Fallback to text icon if asset not loaded
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-[#EDEDED] to-[#ffc174] bg-clip-text text-transparent font-['Geist']">
                ChaiCircle
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-[#f59e0b] -mt-1 hidden sm:inline">
                Social Adda
              </span>
            </div>
          </Link>

          {/* Center Navigation Pill (Desktop) - SAME ITEMS, ELEVATED UI */}
          <nav className="hidden md:flex items-center gap-1.5 p-1.5 bg-[#111318]/70 backdrop-blur-lg rounded-full border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  title={item.name.toLowerCase()}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-white bg-[#1f2022] shadow-[0_0_12px_rgba(245,158,11,0.2)] border border-[#f59e0b]/40 font-semibold"
                      : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <span className={`${active ? "text-[#ffc174]" : "text-[#94A3B8] group-hover:text-white"}`}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Auth Button */}
          <div className="flex items-center gap-3">
            {User ? (
              <Link
                to={`/${isuser}`}
                title="profile"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#f59e0b] to-[#c2841a] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-200"
              >
                <PersonIcon className="!text-[18px]" />
                <span>Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                title="login"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all duration-200"
              >
                <span>Login</span>
                <span className="text-xs">→</span>
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Toggle navigation menu"
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-[#111318] border border-white/[0.08] text-[#94A3B8] hover:text-white hover:bg-white/[0.05] transition-colors"
            >
              <MenuIcon className="!text-[24px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer with SAME Items */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#0D0F12",
            color: "#e3e2e5",
            width: "80vw",
            maxWidth: "360px",
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundImage: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.08), transparent 70%)",
          },
        }}
      >
        <div className="flex flex-col h-full p-6 justify-between">
          <div>
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5">
                <img
                  src="/stitch/asset_1.png"
                  alt="ChaiCircle"
                  className="w-7 h-7 object-contain"
                />
                <span className="text-xl font-bold tracking-tight text-white font-['Geist']">
                  ChaiCircle
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon className="!text-[22px]" />
              </button>
            </div>

            {/* Nav Items List */}
            <div className="flex flex-col gap-2 mt-6">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    title={item.name.toLowerCase()}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      active
                        ? "bg-[#1f2022] text-[#ffc174] border border-[#f59e0b]/30 font-semibold"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className={active ? "text-[#ffc174]" : "text-[#94A3B8]"}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Drawer Footer Auth Button */}
          <div className="pt-6 border-t border-white/[0.08]">
            {User ? (
              <Link
                to={`/${isuser}`}
                title="profile"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-[#f59e0b] to-[#c2841a] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
              >
                <PersonIcon className="!text-[20px]" />
                <span>My Profile</span>
              </Link>
            ) : (
              <Link
                to="/login"
                title="login"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-base font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] to-[#f59e0b] hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all"
              >
                <span>Login to ChaiCircle</span>
                <span>→</span>
              </Link>
            )}
            <p className="mt-4 text-center text-xs text-[#64748B]">
              Brewing connections that truly matter.
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
