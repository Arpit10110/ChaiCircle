import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<'creators' | 'frontend' | 'founders'>('creators');
  const [thoughtInput, setThoughtInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Vikram",
      tag: "VK",
      time: "2m ago",
      color: "bg-[#f59e0b]/20 text-[#ffc174]",
      text: "Building an audio visualizer with Web Audio API. Anyone know how to smoothen the frequency bins without latency?"
    },
    {
      id: 2,
      sender: "Sana (DSP dev)",
      tag: "SZ",
      time: "Just now",
      color: "bg-[#ff9837]/30 text-[#ffc08e]",
      isReply: true,
      text: "Use smoothingTimeConstant = 0.85 and interpolate between frames via requestAnimationFrame! Works like butter."
    }
  ]);

  const handleSendThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!thoughtInput.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: "You",
        tag: "ME",
        time: "Just now",
        color: "bg-[#ffb951]/30 text-[#ffc174]",
        isReply: true,
        text: thoughtInput.trim()
      }
    ]);
    setThoughtInput('');
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#08090B] pt-12 md:pt-20 pb-20">
      {/* Atmospheric Ambient Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] bg-gradient-to-b from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent blur-[140px] rounded-full"></div>
      <div className="pointer-events-none absolute -top-24 right-10 w-96 h-96 bg-[#ffddb8]/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Eyebrow & Hero Header */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181B21]/90 border border-white/[0.08] backdrop-blur-md shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] -ml-3.5"></span>
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              A Place to Belong
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-[72px] font-bold leading-[1.08] tracking-tight text-[#F8F9FA] max-w-4xl">
            Find your people.<br />
            <span className="bg-gradient-to-r from-[#F8F9FA] via-[#ffc174] to-[#ffb95f] bg-clip-text text-transparent">
              Start your circle.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] mt-6 max-w-2xl text-center leading-relaxed">
            Discover conversations, meet interesting people, and build high-trust communities around the craft, ideas, and curiosities you truly care about.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#ff9837] shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Join ChaiCircle</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <a
              href="#discover"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-medium text-[#F8F9FA] bg-[#181B21]/80 border border-white/[0.08] hover:bg-[#292a2c] transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[#ffc174] text-[18px]">explore</span>
              <span>Explore Communities</span>
            </a>
          </div>

          <span className="text-xs text-[#64748B] mt-4 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffc174] text-[16px]">verified</span>
            Made for conversations that actually matter. No vanity feeds.
          </span>
        </div>

        {/* HERO VISUAL: DUAL CANVAS (Living Network Graph + Glassmorphic Workspace) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Living Dynamic Network Canvas (Left: 5 cols) */}
          <div className="lg:col-span-5 relative min-h-[460px] rounded-2xl bg-[#0D0F12]/95 border border-white/[0.08] shadow-2xl overflow-hidden p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-[#94A3B8] font-medium">
                  Live Orbit Network
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#292a2c] text-[#ffc174] font-medium border border-white/[0.05]">
                842 online
              </span>
            </div>

            {/* Network Diagram with SVG Pulsing Web */}
            <div className="relative w-full h-[320px] flex items-center justify-center my-auto">
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/[0.08]" fill="none" viewBox="0 0 400 340">
                <circle cx="200" cy="170" opacity="0.3" r="130" stroke="currentColor" strokeDasharray="3 3"></circle>
                <circle cx="200" cy="170" opacity="0.4" r="75" stroke="currentColor" strokeDasharray="2 4"></circle>
                <path d="M200 170 L 75 75" opacity="0.75" stroke="url(#amber-ray)" strokeWidth="1.5"></path>
                <path d="M200 170 L 325 80" opacity="0.75" stroke="url(#amber-ray)" strokeWidth="1.5"></path>
                <path d="M200 170 L 315 260" opacity="0.75" stroke="url(#amber-ray)" strokeWidth="1.5"></path>
                <path d="M200 170 L 80 260" opacity="0.75" stroke="url(#amber-ray)" strokeWidth="1.5"></path>
                <path d="M200 170 L 200 45" opacity="0.75" stroke="url(#amber-ray)" strokeWidth="1.5"></path>
                <defs>
                  <linearGradient id="amber-ray" x1="0%" x2="100%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"></stop>
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.05"></stop>
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Chai Node */}
              <div className="relative z-20 flex flex-col items-center group cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#ff9837] p-0.5 shadow-[0_0_36px_rgba(245,158,11,0.55)] transition-transform duration-300 group-hover:scale-110">
                  <div className="w-full h-full rounded-full bg-[#08090B] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#ffc174] text-[30px]">coffee</span>
                  </div>
                </div>
                <span className="mt-1.5 text-xs text-[#F8F9FA] font-medium">Chai Hub</span>
              </div>

              {/* Orbit Node 1: Aditi (Design) */}
              <div className="absolute top-4 left-3 z-20 flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#111318]/90 border border-white/[0.08] shadow-lg backdrop-blur-md hover:bg-[#1f2022] transition-all cursor-pointer">
                <img
                  className="w-7 h-7 rounded-full object-cover"
                  src="/stitch/asset_2.png"
                  alt="Aditi"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-[#F8F9FA] font-semibold leading-none">Aditi</span>
                  <span className="text-[10px] text-[#ffc174] leading-tight mt-0.5">Design & Type</span>
                </div>
              </div>

              {/* Orbit Node 2: Rahul (Tech) */}
              <div className="absolute top-4 right-3 z-20 flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#111318]/90 border border-white/[0.08] shadow-lg backdrop-blur-md hover:bg-[#1f2022] transition-all cursor-pointer">
                <img
                  className="w-7 h-7 rounded-full object-cover"
                  src="/stitch/asset_3.png"
                  alt="Rahul"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-[#F8F9FA] font-semibold leading-none">Rahul</span>
                  <span className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Systems & Rust</span>
                </div>
              </div>

              {/* Orbit Node 3: Maya (Music) */}
              <div className="absolute bottom-5 right-3 z-20 flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#111318]/90 border border-white/[0.08] shadow-lg backdrop-blur-md hover:bg-[#1f2022] transition-all cursor-pointer">
                <img
                  className="w-7 h-7 rounded-full object-cover"
                  src="/stitch/asset_4.png"
                  alt="Maya"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-[#F8F9FA] font-semibold leading-none">Maya</span>
                  <span className="text-[10px] text-[#ffc08e] leading-tight mt-0.5">Modular Synth</span>
                </div>
              </div>

              {/* Orbit Node 4: Arjun (Gaming) */}
              <div className="absolute bottom-5 left-3 z-20 flex items-center gap-2 p-1.5 pr-3 rounded-full bg-[#111318]/90 border border-white/[0.08] shadow-lg backdrop-blur-md hover:bg-[#1f2022] transition-all cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-[#343537] flex items-center justify-center text-[#ffc174] font-bold text-[11px]">
                  AJ
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#F8F9FA] font-semibold leading-none">Arjun</span>
                  <span className="text-[10px] text-[#94A3B8] leading-tight mt-0.5">Indie Gaming</span>
                </div>
              </div>

              {/* Floating Micro Snippets */}
              <div className="absolute top-[48%] -left-1 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181B21]/95 border border-white/[0.08] shadow-md text-[#EDEDED] text-xs">
                <span className="text-[#ffc174] text-[11px]">✦</span>
                <span>"Anyone into ambient jazz?"</span>
              </div>
              <div className="absolute top-[32%] right-2 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181B21]/95 border border-white/[0.08] shadow-md text-[#EDEDED] text-xs">
                <span className="text-[#ffc174] text-[11px]">●</span>
                <span>"Bangalore meetup this Sat?"</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.05] text-[#64748B] text-xs">
              <span>Dynamic clustering</span>
              <span className="text-[#ffc174] font-mono text-[11px]">ping: 18ms</span>
            </div>
          </div>

          {/* Sleek ChaiCircle Product Window UI (Right: 7 cols) */}
          <div className="lg:col-span-7 bg-[#0D0F12]/95 border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col justify-between">
            {/* Window Header Bar */}
            <div className="px-5 py-3 bg-[#1b1c1e] border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]/70 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/70 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]/70 inline-block"></span>
                <span className="ml-2 text-xs text-[#94A3B8] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#ffc174] text-[16px]">bubble_chart</span>
                  ChaiCircle Desktop Workspace
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#1f2022] font-mono text-[11px] text-[#64748B]">v2.4.0</span>
                <span className="w-2 h-2 rounded-full bg-[#ffc174] animate-pulse"></span>
              </div>
            </div>

            {/* Product Window Content Area */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
              
              {/* Left Sub-Panel: Active Live Spaces */}
              <div className="md:col-span-5 flex flex-col gap-2 bg-[#0d0e10] p-3 rounded-xl border border-white/[0.04]">
                <span className="text-[11px] uppercase tracking-wider text-[#64748B] px-1 font-semibold">
                  Live Chai Rooms
                </span>

                {/* Room 1 */}
                <div
                  onClick={() => setActiveRoom('creators')}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col gap-1 border ${
                    activeRoom === 'creators'
                      ? 'bg-[#181B21] border-[#f59e0b]/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                      : 'bg-[#1b1c1e]/60 border-transparent hover:bg-[#181B21]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F8F9FA] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping"></span>
                      Late Night Creators
                    </span>
                    <span className="text-[10px] text-[#ffc174] font-bold px-1.5 py-0.5 rounded bg-[#f59e0b]/20">LIVE</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] line-clamp-1">Prototyping canvas layouts & coffee</p>
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-white/[0.04]">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <span className="w-5 h-5 rounded-full bg-[#38393b] text-[#F8F9FA] text-[10px] flex items-center justify-center font-bold">R</span>
                      <span className="w-5 h-5 rounded-full bg-[#ffc174] text-[#472a00] text-[10px] flex items-center justify-center font-bold">A</span>
                      <span className="w-5 h-5 rounded-full bg-[#343537] text-[#64748B] text-[10px] flex items-center justify-center font-semibold">+18</span>
                    </div>
                    <span className="text-[11px] text-[#64748B]">44 active</span>
                  </div>
                </div>

                {/* Room 2 */}
                <div
                  onClick={() => setActiveRoom('frontend')}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col gap-1 border ${
                    activeRoom === 'frontend'
                      ? 'bg-[#181B21] border-[#f59e0b]/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                      : 'bg-[#1b1c1e]/60 border-transparent hover:bg-[#181B21]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F8F9FA] font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#64748B]"></span>
                      Frontend Craft
                    </span>
                    <span className="text-[10px] text-[#64748B]">1.2k mem</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] line-clamp-1">Tailwind vs CSS Grid arguments</p>
                </div>

                {/* Room 3 */}
                <div
                  onClick={() => setActiveRoom('founders')}
                  className={`p-3 rounded-xl transition-all cursor-pointer flex flex-col gap-1 border ${
                    activeRoom === 'founders'
                      ? 'bg-[#181B21] border-[#f59e0b]/40 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                      : 'bg-[#1b1c1e]/60 border-transparent hover:bg-[#181B21]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#F8F9FA] font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#64748B]"></span>
                      Solo Founders Club
                    </span>
                    <span className="text-[10px] text-[#64748B]">3.8k mem</span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] line-clamp-1">Week 12 metrics honest breakdown</p>
                </div>
              </div>

              {/* Right Sub-Panel: Active Conversation Stream */}
              <div className="md:col-span-7 flex flex-col justify-between bg-[#0d0e10] p-4 rounded-xl border border-white/[0.04] min-h-[280px]">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#ffc174] text-[18px]">forum</span>
                      <span className="text-xs text-[#F8F9FA] font-semibold">
                        # {activeRoom === 'creators' ? 'craft-and-coffee' : activeRoom === 'frontend' ? 'frontend-devs' : 'founders-corner'}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#64748B]">Warm Moderation</span>
                  </div>

                  {/* Messages Stream */}
                  <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex items-start gap-2.5 ${msg.isReply ? 'ml-4' : ''}`}>
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${msg.color}`}>
                          {msg.tag}
                        </span>
                        <div className="bg-[#181B21] border border-white/[0.06] p-2.5 rounded-xl rounded-tl-none shadow-sm flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs text-[#ffc174] font-medium">{msg.sender}</span>
                            <span className="text-[10px] text-[#64748B]">{msg.time}</span>
                          </div>
                          <p className="text-xs text-[#EDEDED] leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Simulated Interactive Reply Input */}
                <form onSubmit={handleSendThought} className="mt-3 pt-2 border-t border-white/[0.04] flex items-center gap-2 bg-[#1f2022] rounded-full px-3 py-1.5">
                  <input
                    value={thoughtInput}
                    onChange={(e) => setThoughtInput(e.target.value)}
                    className="bg-transparent text-[#F8F9FA] placeholder:text-[#64748B] text-xs w-full focus:outline-none"
                    placeholder="Add a mindful thought to circle..."
                    type="text"
                  />
                  <button
                    type="submit"
                    className="w-7 h-7 rounded-full bg-[#f59e0b] text-[#2a1700] flex items-center justify-center shrink-0 hover:brightness-110 active:scale-95 transition-all shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                  >
                    <span className="material-symbols-outlined text-[14px]">send</span>
                  </button>
                </form>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
