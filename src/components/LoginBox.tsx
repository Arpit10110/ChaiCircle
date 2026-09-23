import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const LoginBox = () => {
  const navigate = useNavigate();
  const [EmailIn, SetEmailIn] = useState<string>('');
  const [PasswordIn, SetPasswordIn] = useState<string>('');
  const [open, setOpen] = useState(false);

  const submit = async (e: any) => {
    setOpen(true);
    e.preventDefault();
    try {
      const userdata = {
        email: EmailIn.trim(),
        password: PasswordIn.trim(),
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_HOST}/login`,
        userdata,
        { withCredentials: true }
      );
      if (data.success === true) {
        navigate('/');
        localStorage.setItem('token', data.username);
        setOpen(false);
      } else {
        toast.warn(data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      setOpen(false);
    }
  };

  return (
    <div className="flex-1 w-full max-w-md mx-auto px-4 pt-14 sm:pt-20 pb-24 relative z-10 flex flex-col justify-center">
      <Backdrop
        sx={(theme) => ({ color: '#ffc174', zIndex: theme.zIndex.drawer + 2 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-gradient-to-b from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent blur-[120px] rounded-full"></div>

      {/* Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0F12] border border-white/[0.08] shadow-2xl backdrop-blur-xl relative">
        
        {/* Brand Badge */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#c2841a] p-0.5 shadow-[0_0_25px_rgba(245,158,11,0.4)] mb-3">
            <div className="w-full h-full bg-[#08090B] rounded-full flex items-center justify-center">
              <img
                src="/stitch/asset_1.png"
                alt="ChaiCircle"
                className="w-7 h-7 object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5">
            Sign in to step into your circle
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#ffc174] block">
              Email Address
            </label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#181B21] border border-white/[0.08] focus-within:border-[#f59e0b]/60 transition-colors">
              <EmailOutlinedIcon className="!text-[18px] text-[#64748B]" />
              <input
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-[#64748B] focus:outline-none"
                type="email"
                value={EmailIn}
                onChange={(e) => SetEmailIn(e.target.value)}
                placeholder="you@domain.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#ffc174] block">
              Password
            </label>
            <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-[#181B21] border border-white/[0.08] focus-within:border-[#f59e0b]/60 transition-colors">
              <LockOutlinedIcon className="!text-[18px] text-[#64748B]" />
              <input
                type="password"
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder:text-[#64748B] focus:outline-none"
                value={PasswordIn}
                onChange={(e) => SetPasswordIn(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-full text-sm font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#ff9837] shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Log In</span>
            <ArrowForwardIcon className="!text-[16px]" />
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
          <p className="text-xs text-[#94A3B8]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#ffc174] font-semibold hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
      />
    </div>
  );
};

export default LoginBox;