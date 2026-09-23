import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0D0F12] border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Brand Info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#c2841a] p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.35)] flex items-center justify-center">
                <div className="w-full h-full bg-[#08090B] rounded-full flex items-center justify-center">
                  <img
                    src="/stitch/asset_1.png"
                    alt="ChaiCircle"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-['Geist']">
                ChaiCircle
              </span>
            </Link>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              Where conversations spark circles. Warm, authentic collaboration for high-trust modern communities without vanity feeds or algorithm traps.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[#94A3B8]">
              <a
                href="https://github.com/Arpit10110"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#181B21] border border-white/[0.06] flex items-center justify-center hover:text-[#ffc174] hover:border-[#f59e0b]/40 transition-all"
                title="Github"
              >
                <GitHubIcon className="!text-[18px]" />
              </a>
              <a
                href="https://www.linkedin.com/in/arpit-agrahari-54aa192a1/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#181B21] border border-white/[0.06] flex items-center justify-center hover:text-[#ffc174] hover:border-[#f59e0b]/40 transition-all"
                title="LinkedIn"
              >
                <LinkedInIcon className="!text-[18px]" />
              </a>
              <a
                href="https://x.com/ArpitAgrahari26?t=IyDaE6R8sNL10VQlozEYrQ&s=09"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#181B21] border border-white/[0.06] flex items-center justify-center hover:text-[#ffc174] hover:border-[#f59e0b]/40 transition-all"
                title="Twitter / X"
              >
                <XIcon className="!text-[18px]" />
              </a>
              <a
                href="https://www.instagram.com/___arpit_._/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#181B21] border border-white/[0.06] flex items-center justify-center hover:text-[#ffc174] hover:border-[#f59e0b]/40 transition-all"
                title="Instagram"
              >
                <InstagramIcon className="!text-[18px]" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ffc174]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Explore Circles
                </Link>
              </li>
              <li>
                <Link to="/addfriends" className="hover:text-white transition-colors">
                  Add Friends
                </Link>
              </li>
              <li>
                <Link to="/message" className="hover:text-white transition-colors">
                  Messages
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Online (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ffc174]">
              Connect Online
            </h4>
            <ul className="space-y-2 text-sm text-[#94A3B8]">
              <li>
                <a
                  href="https://www.instagram.com/___arpit_._/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#ffc174] transition-colors"
                >
                  <InstagramIcon className="!text-[18px]" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Arpit10110"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#ffc174] transition-colors"
                >
                  <GitHubIcon className="!text-[18px]" /> GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/arpit-agrahari-54aa192a1/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#ffc174] transition-colors"
                >
                  <LinkedInIcon className="!text-[18px]" /> LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/ArpitAgrahari26?t=IyDaE6R8sNL10VQlozEYrQ&s=09"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#ffc174] transition-colors"
                >
                  <XIcon className="!text-[18px]" /> Twitter / X
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/arpit.agrahari.5"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-[#ffc174] transition-colors"
                >
                  <FacebookIcon className="!text-[18px]" /> Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Meet The Creator (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#ffc174] flex items-center gap-1.5">
              Meet the Creator 🧡
            </h4>
            <div className="p-4 rounded-xl bg-[#181B21] border border-white/[0.06] space-y-2">
              <span className="text-sm font-semibold text-white block">Arpit Agrahari</span>
              <a
                href="https://arpitdev.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#ffc174] transition-colors"
              >
                <LanguageIcon className="!text-[16px]" /> Portfolio Website
              </a>
              <a
                href="mailto:omagrahari55@gmail.com"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#ffc174] transition-colors"
              >
                <EmailIcon className="!text-[16px]" /> omagrahari55@gmail.com
              </a>
              <a
                href="tel:+919599056856"
                className="flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#ffc174] transition-colors"
              >
                <PhoneIcon className="!text-[16px]" /> +91 9599056856
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#64748B] text-center sm:text-left">
            © 2026 ChaiCircle. Built around people, not algorithms. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] inline-block animate-pulse"></span>
            <span className="text-xs text-[#94A3B8] font-mono">
              Ambient Thermal Engine v2.4
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;