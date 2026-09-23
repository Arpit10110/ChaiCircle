import React from 'react';
import { Link } from 'react-router-dom';

const PhilosophyAndCTA: React.FC = () => {
  return (
    <>
      {/* SECTION 9: CORE PHILOSOPHY */}
      <section className="w-full py-20 bg-[#08090B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-3xl bg-[#0D0F12] border border-white/[0.08] shadow-2xl">
            
            <div className="max-w-3xl mb-12">
              <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
                Human Centric Ethics
              </span>
              <h2 className="text-3xl sm:text-4xl text-[#F8F9FA] font-bold mt-2">
                Built around people, not algorithmic traps.
              </h2>
              <p className="text-base text-[#94A3B8] mt-3">
                We questioned every engagement hack inherited from legacy ad-driven social networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-[#181B21] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#1f2022] border border-white/[0.08] flex items-center justify-center text-[#ffc174] font-mono text-sm font-bold">
                  01
                </div>
                <h3 className="text-xl text-[#F8F9FA] font-semibold">No engagement bait</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  We do not measure success by time-on-screen or dopamine spikes. We measure meaningful interactions concluded per session.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#181B21] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#1f2022] border border-white/[0.08] flex items-center justify-center text-[#ffc174] font-mono text-sm font-bold">
                  02
                </div>
                <h3 className="text-xl text-[#F8F9FA] font-semibold">Context before clout</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Follower counters are absent. Your credibility in a circle stems from your insights and helpfulness within that topic.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#181B21] border border-white/[0.06] space-y-3">
                <div className="w-9 h-9 rounded-xl bg-[#1f2022] border border-white/[0.08] flex items-center justify-center text-[#ffc174] font-mono text-sm font-bold">
                  03
                </div>
                <h3 className="text-xl text-[#F8F9FA] font-semibold">Safe & welcoming spaces</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Member-moderated circles with granular invite codes and zero tolerance for harassment or low-effort promotional noise.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10: CLOSING CALL-TO-ACTION (ATMOSPHERIC RADIANCE) */}
      <section className="w-full py-24 bg-[#08090B] relative overflow-hidden">
        {/* Centered Ambient Radiant Core */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-t from-[#f59e0b]/20 via-[#f59e0b]/5 to-transparent blur-[140px] rounded-full"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-8">
          
          <div className="inline-flex items-center gap-2 p-1.5 px-4 rounded-full bg-[#181B21]/90 border border-white/[0.08] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            <span className="text-xs text-[#ffc174] font-semibold uppercase tracking-wider">
              The Kettle is Hot
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-[64px] leading-tight text-[#F8F9FA] font-bold">
            Your circle is waiting.
          </h2>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-xl mx-auto mt-6 leading-relaxed">
            Join conversations that feel a little more like home. Free to join, open to all curious minds.
          </p>

          {/* Closing Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-semibold text-[#2a1700] bg-gradient-to-r from-[#ffc174] via-[#f59e0b] to-[#ff9837] shadow-[0_0_35px_rgba(245,158,11,0.4)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Join ChaiCircle Now</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </Link>

            <Link
              to="/explore"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full text-base font-medium text-[#F8F9FA] bg-[#181B21] border border-white/[0.08] hover:bg-[#292a2c] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Communities</span>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[#64748B] text-xs">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffc174]">lock</span>
              Encrypted & Private
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffc174]">block</span>
              No Data Brokerage
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#ffc174]">spark</span>
              Community Run
            </span>
          </div>

        </div>
      </section>
    </>
  );
};

export default PhilosophyAndCTA;
