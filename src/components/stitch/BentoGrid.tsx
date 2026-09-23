import React from 'react';

const BentoGrid: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#0D0F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
            Eclectic Realms
          </span>
          <h2 className="text-3xl sm:text-4xl text-[#F8F9FA] font-bold mt-2">
            Find a circle for whatever you're into.
          </h2>
          <p className="text-base text-[#94A3B8] mt-3">
            Whether high-level systems architecture or micro-niche analog hobbies, your subculture is already meeting here.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento 1: Tech Code Preview (Large 7 cols) */}
          <div className="md:col-span-7 bg-[#181B21] border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-md flex flex-col justify-between overflow-hidden relative group">
            <div className="space-y-2 relative z-10">
              <div className="flex items-center gap-2 text-[#ffc174] text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">code</span>
                Engineering & Systems
              </div>
              <h3 className="text-2xl text-[#F8F9FA] font-bold">
                Under the hood discussions
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-lg leading-relaxed">
                From zero-knowledge proofs to WebAssembly graphics engines, engineers discuss architecture without recruiter spam or marketing hype.
              </p>
            </div>

            {/* Code Snippet Mockup */}
            <div className="mt-6 p-4 rounded-xl bg-[#08090B] border border-white/[0.06] font-mono text-[11px] sm:text-[12px] text-[#EDEDED] shadow-inner overflow-x-auto">
              <div className="flex items-center justify-between text-[#64748B] text-[10px] pb-2 mb-2 border-b border-white/[0.06]">
                <span>circle_sync.rs</span>
                <span className="text-[#ffc174]">fn broadcast_heartbeat()</span>
              </div>
              <span className="text-[#64748B]">// Zero-latency peer mesh connection</span><br />
              <span className="text-[#ffb77d]">async fn</span> <span className="text-[#ffc174]">connect_circle</span>(peer: &amp;PeerId) -&gt; Result&lt;WarmSession&gt; &#123;<br />
              &nbsp;&nbsp;<span className="text-[#ffb951]">let</span> stream = Mesh::dial(peer).await?;<br />
              &nbsp;&nbsp;stream.send(Signal::Warmth(0.95)).await?;<br />
              &nbsp;&nbsp;<span className="text-[#F8F9FA]">Ok(WarmSession::new(stream))</span><br />
              &#125;
            </div>
          </div>

          {/* Bento 2: Audio & Music Synthesizer (5 cols) */}
          <div className="md:col-span-5 bg-[#181B21] border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-md flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#ffb77d] text-xs font-semibold">
                <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
                Sound & Lo-Fi Frequency
              </div>
              <h3 className="text-2xl text-[#F8F9FA] font-bold">
                Real-time Jam Lounges
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Listen in or plug in your hardware synth. Ambient radio and chill beats streamed by community members 24/7.
              </p>
            </div>

            {/* SVG Audio Equalizer Waveform */}
            <div className="mt-6 p-4 rounded-xl bg-[#1b1c1e] border border-white/[0.04] flex items-end justify-center gap-2 h-36">
              <span className="w-2.5 rounded-full bg-[#f59e0b]/80 h-10 animate-pulse"></span>
              <span className="w-2.5 rounded-full bg-[#f59e0b] h-16 animate-pulse [animation-delay:0.1s]"></span>
              <span className="w-2.5 rounded-full bg-[#ffc174] h-24 animate-pulse [animation-delay:0.25s]"></span>
              <span className="w-2.5 rounded-full bg-[#ffb77d] h-20 animate-pulse [animation-delay:0.15s]"></span>
              <span className="w-2.5 rounded-full bg-[#ffc174] h-28 animate-pulse [animation-delay:0.3s]"></span>
              <span className="w-2.5 rounded-full bg-[#f59e0b] h-12 animate-pulse [animation-delay:0.05s]"></span>
              <span className="w-2.5 rounded-full bg-[#ff9837] h-18 animate-pulse [animation-delay:0.2s]"></span>
              <span className="w-2.5 rounded-full bg-[#ffc174] h-24 animate-pulse [animation-delay:0.35s]"></span>
              <span className="w-2.5 rounded-full bg-[#f59e0b]/60 h-8 animate-pulse"></span>
            </div>
          </div>

          {/* Bento 3: Local Circles Across Continents (Wide 8 cols) */}
          <div className="md:col-span-8 bg-[#181B21] border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-md flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <span className="text-xs text-[#ffc174] uppercase tracking-wider font-semibold">
                  Local Meetups
                </span>
                <h3 className="text-2xl text-[#F8F9FA] font-bold mt-1">
                  From Bangalore to Berlin
                </h3>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-[#1f2022] border border-white/[0.05] text-[#94A3B8] text-xs self-start sm:self-auto">
                18 global chapters
              </span>
            </div>
            <p className="text-sm text-[#94A3B8] max-w-xl leading-relaxed">
              Online circles regularly translate into real-world gatherings at indie tea stalls, coffee roasters, and park benches.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="p-3.5 rounded-xl bg-[#292a2c]/60 border border-white/[0.05] text-center">
                <span className="text-lg font-bold text-[#F8F9FA]">BLR</span>
                <p className="text-xs text-[#64748B] mt-0.5">Indiranagar Chai</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#292a2c]/60 border border-white/[0.05] text-center">
                <span className="text-lg font-bold text-[#F8F9FA]">BER</span>
                <p className="text-xs text-[#64748B] mt-0.5">Kreuzberg Circle</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#292a2c]/60 border border-white/[0.05] text-center">
                <span className="text-lg font-bold text-[#F8F9FA]">SFO</span>
                <p className="text-xs text-[#64748B] mt-0.5">Mission Collective</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#292a2c]/60 border border-white/[0.05] text-center">
                <span className="text-lg font-bold text-[#F8F9FA]">TOK</span>
                <p className="text-xs text-[#64748B] mt-0.5">Shibuya Tech Chai</p>
              </div>
            </div>
          </div>

          {/* Bento 4: Muted Philosophy & Quotes (4 cols) */}
          <div className="md:col-span-4 bg-[#181B21] border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-[#ffc174] text-[32px]">
                format_quote
              </span>
              <p className="text-sm text-[#EDEDED] italic mt-3 leading-relaxed">
                "We shape our digital rooms, thereafter our digital rooms shape us. The places we gather dictate the ideas we bring to life."
              </p>
            </div>
            <div className="pt-6 border-t border-white/[0.06] mt-4">
              <span className="text-sm text-[#F8F9FA] font-semibold block">
                The Chai Ethos
              </span>
              <span className="text-xs text-[#64748B]">Manifesto 2026</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BentoGrid;
