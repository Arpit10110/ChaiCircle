import React from 'react';

const EditorialContrast: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#08090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Editorial Headline */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              The Shift in Ritual
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-[44px] leading-tight text-[#F8F9FA] font-bold">
              The modern web is overwhelmingly loud.{" "}
              <span className="text-[#64748B]">Finding authentic circles shouldn't feel like survival.</span>
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              Mainstream feeds monetize indignation, superficial impressions, and endless swiping. ChaiCircle is anchored in an ancient human ritual: taking pause, sharing a warm cup, and having honest conversations that nurture curiosity rather than addiction.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#0D0F12] border border-white/[0.08] shadow-sm">
                <span className="text-3xl font-bold text-[#F8F9FA]">Zero</span>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
                  Algorithmically curated feeds engineered to enrage or distract.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-[#0D0F12] border border-white/[0.08] shadow-sm">
                <span className="text-3xl font-bold text-[#ffc174]">100%</span>
                <p className="text-xs sm:text-sm text-[#94A3B8] mt-1.5 leading-relaxed">
                  Direct community membership where your presence is valued.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Chaotic Feeds vs Warm Amber Harmony */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Fragment 1: The Noise */}
              <div className="p-5 rounded-2xl bg-[#0D0F12]/60 border border-white/[0.05] space-y-3 opacity-60">
                <div className="flex items-center justify-between text-[#64748B] text-xs">
                  <span className="line-through">Algorithmic Feed</span>
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </div>
                <div className="space-y-2">
                  <div className="h-2.5 w-3/4 rounded bg-[#343537]"></div>
                  <div className="h-2.5 w-full rounded bg-[#343537]"></div>
                  <div className="h-2.5 w-1/2 rounded bg-[#343537]"></div>
                </div>
                <span className="inline-block text-[11px] text-[#ff8077] font-mono">
                  Engagement Bait Detected
                </span>
              </div>

              {/* Fragment 2: The ChaiCircle Sanctuary */}
              <div className="p-5 rounded-2xl bg-[#181B21] border border-[#f59e0b]/30 shadow-xl space-y-3 relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#f59e0b]/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#ffc174] font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    ChaiCircle Room
                  </span>
                  <span className="font-mono text-[10px] text-[#ffc174]">Active</span>
                </div>
                <p className="text-sm text-[#F8F9FA] font-medium leading-relaxed">
                  "We spent two hours reviewing typography pairings for open-source books. Felt so restorative."
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                  <span className="w-6 h-6 rounded-full bg-[#f59e0b] text-[#2a1700] font-bold text-[10px] flex items-center justify-center">
                    MK
                  </span>
                  <span className="text-xs text-[#94A3B8]">Manya & 12 others in voice</span>
                </div>
              </div>

              {/* Fragment 3: Context Before Clout */}
              <div className="sm:col-span-2 p-5 rounded-2xl bg-[#0D0F12] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1f2022] flex items-center justify-center text-[#ffc174]">
                    <span className="material-symbols-outlined">diversity_3</span>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#F8F9FA]">Human-Sized Spaces</h4>
                    <p className="text-xs text-[#94A3B8]">Circles capped at intimate sizes so every member has a voice.</p>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#f59e0b]/15 text-[#ffc174] border border-[#f59e0b]/30 text-xs font-semibold shrink-0">
                  High-Trust Architecture
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialContrast;
