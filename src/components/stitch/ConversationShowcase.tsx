import React from 'react';

const ConversationShowcase: React.FC = () => {
  return (
    <section className="w-full py-20 bg-[#08090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Thread Mockup Preview */}
          <div className="lg:col-span-7 bg-[#0D0F12] border border-white/[0.08] p-6 md:p-8 rounded-2xl shadow-2xl relative">
            
            {/* Room Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#f59e0b]/20 flex items-center justify-center text-[#ffc174] font-semibold text-sm">
                  #
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#F8F9FA]">
                    What's something you're building right now?
                  </h4>
                  <p className="text-xs text-[#64748B]">Posted by Tarun • in #creators-lounge</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#181B21] border border-white/[0.06] text-[#94A3B8] text-xs">
                48 replies
              </span>
            </div>

            {/* Vertical Thread Flow with glowing connection */}
            <div className="space-y-4 relative mt-5 pl-4 sm:pl-6 before:absolute before:left-7 before:top-4 before:bottom-6 before:w-[2px] before:bg-gradient-to-b before:from-[#f59e0b] before:via-[#343537] before:to-transparent">
              
              {/* Reply 1: Devika */}
              <div className="relative flex items-start gap-3">
                <img
                  className="w-8 h-8 rounded-full object-cover shrink-0 relative z-10 border border-[#f59e0b]/40"
                  src="/stitch/asset_9.png"
                  alt="Devika"
                />
                <div className="p-3.5 rounded-2xl bg-[#181B21] border border-white/[0.06] shadow-sm w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#F8F9FA] font-semibold">
                      Devika • <span className="font-normal text-[#64748B] text-[11px]">WebGL Architect</span>
                    </span>
                    <span className="text-[10px] text-[#64748B]">12m ago</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#EDEDED] leading-relaxed">
                    Re-architecting an open source canvas tool in WebGL. It’s tough juggling shader performance on mobile, but seeing 60fps tactile strokes makes every debug hour worth it.
                  </p>
                </div>
              </div>

              {/* Reply 2: Marcus */}
              <div className="relative flex items-start gap-3">
                <img
                  className="w-8 h-8 rounded-full object-cover shrink-0 relative z-10 border border-white/[0.1]"
                  src="/stitch/asset_10.png"
                  alt="Marcus"
                />
                <div className="p-3.5 rounded-2xl bg-[#181B21] border border-white/[0.06] shadow-sm w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#F8F9FA] font-semibold">
                      Marcus • <span className="font-normal text-[#64748B] text-[11px]">Editorial Lead</span>
                    </span>
                    <span className="text-[10px] text-[#64748B]">8m ago</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#EDEDED] leading-relaxed">
                    Pairing with a founder in Berlin on an editorial reading app. We replaced standard serif bodies with custom variable glyphs that subtly widen based on reader ambient light.
                  </p>
                </div>
              </div>

              {/* Reply 3: Typing indicator */}
              <div className="relative flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#f59e0b] text-[#472a00] flex items-center justify-center font-bold text-xs shrink-0 relative z-10">
                  RK
                </div>
                <div className="p-3 rounded-xl bg-[#292a2c]/70 border border-white/[0.05] flex items-center gap-2 text-[#94A3B8] text-xs">
                  <span>Rahul is typing</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174] animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174] animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffc174] animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right: Text & Statement */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              The Art of Conversation
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#F8F9FA] font-bold leading-tight">
              Good conversations create unexpected connections.
            </h2>
            <p className="text-base text-[#94A3B8] leading-relaxed">
              No clickbait headlines, no automated bot replies, and no influencer hierarchies. Every circle is designed for intentional exchanges where questions receive thoughtful answers.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#181B21] border border-white/[0.08] text-[#ffc174] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">timer</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F8F9FA]">Paced for Depth</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Designed for contemplation rather than rapid doomscrolling reflexes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#181B21] border border-white/[0.08] text-[#ffc174] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">lock_clock</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F8F9FA]">Ephemeral Voice Huddles</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Casual audio lounges that naturally wrap up once the chai cools down.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-[#181B21] border border-white/[0.08] text-[#ffc174] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">handshake</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#F8F9FA]">Mutual Respect First</h4>
                  <p className="text-xs text-[#94A3B8] mt-0.5">Community standards and moderation baked directly into the circle culture.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ConversationShowcase;
