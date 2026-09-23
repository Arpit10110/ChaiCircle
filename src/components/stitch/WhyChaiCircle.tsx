import React from 'react';

const WhyChaiCircle: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#08090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
            Purpose-Built Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl text-[#F8F9FA] font-bold mt-2">
            Three principles that change everything.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Statement 1 */}
          <div className="p-8 rounded-2xl bg-[#0D0F12] border border-white/[0.08] shadow-sm space-y-6 flex flex-col justify-between hover:border-[#f59e0b]/30 transition-all duration-300">
            <div>
              <span className="font-mono text-[#ffc174] font-bold text-lg">01 // DISCOVER</span>
              <h3 className="text-xl sm:text-2xl text-[#F8F9FA] font-bold mt-3">
                Conversations worth joining.
              </h3>
              <p className="text-sm text-[#94A3B8] mt-2.5 leading-relaxed">
                Skip the algorithmic lottery. Find active threads centered on questions and hypotheses rather than hot takes and performative outrage.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181B21] border border-white/[0.06] text-[#EDEDED] text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffc174] text-[18px]">
                search_check
              </span>
              <span>Semantically matched to your curiosities</span>
            </div>
          </div>

          {/* Statement 2 */}
          <div className="p-8 rounded-2xl bg-[#0D0F12] border border-white/[0.08] shadow-sm space-y-6 flex flex-col justify-between hover:border-[#f59e0b]/30 transition-all duration-300">
            <div>
              <span className="font-mono text-[#ffc174] font-bold text-lg">02 // CONNECT</span>
              <h3 className="text-xl sm:text-2xl text-[#F8F9FA] font-bold mt-3">
                Meet people who truly get it.
              </h3>
              <p className="text-sm text-[#94A3B8] mt-2.5 leading-relaxed">
                When everyone in the circle shares domain context, you can skip the introductory jargon and jump straight to the nuanced ideas.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181B21] border border-white/[0.06] text-[#EDEDED] text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffc174] text-[18px]">
                interests
              </span>
              <span>High-density mutual interests</span>
            </div>
          </div>

          {/* Statement 3 */}
          <div className="p-8 rounded-2xl bg-[#0D0F12] border border-white/[0.08] shadow-sm space-y-6 flex flex-col justify-between hover:border-[#f59e0b]/30 transition-all duration-300">
            <div>
              <span className="font-mono text-[#ffc174] font-bold text-lg">03 // BELONG</span>
              <h3 className="text-xl sm:text-2xl text-[#F8F9FA] font-bold mt-3">
                Build your own circle.
              </h3>
              <p className="text-sm text-[#94A3B8] mt-2.5 leading-relaxed">
                Start your own sovereign community with curated admission keys, cozy audio spaces, and persistent knowledge archives.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#181B21] border border-white/[0.06] text-[#EDEDED] text-xs flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ffc174] text-[18px]">
                nest_farsight_weather
              </span>
              <span>Host rooms that feel like home</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChaiCircle;
