import React, { useState } from 'react';

const CommunityGraph: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<string | null>(null);

  const hubs = [
    {
      id: 'tech',
      name: 'Tech & Systems',
      nodes: '4.2k nodes',
      icon: 'terminal',
      position: 'top-8 left-6 sm:left-24 md:left-32',
      color: 'border-[#f59e0b]/40',
      activeColor: 'bg-[#f59e0b] text-[#2a1700]'
    },
    {
      id: 'design',
      name: 'Design & Craft',
      nodes: '3.1k nodes',
      icon: 'brush',
      position: 'top-8 right-6 sm:right-24 md:right-32',
      color: 'border-[#ffb951]/40',
      activeColor: 'bg-[#ffb951] text-[#2a1700]'
    },
    {
      id: 'music',
      name: 'Music & Synth',
      nodes: '2.8k nodes',
      icon: 'equalizer',
      position: 'bottom-12 left-6 sm:left-28 md:left-36',
      color: 'border-[#ff9837]/40',
      activeColor: 'bg-[#ff9837] text-[#2a1700]'
    },
    {
      id: 'literature',
      name: 'Literature',
      nodes: '1.9k nodes',
      icon: 'auto_stories',
      position: 'bottom-12 right-6 sm:right-28 md:right-36',
      color: 'border-[#ffc08e]/40',
      activeColor: 'bg-[#ffc08e] text-[#2a1700]'
    }
  ];

  return (
    <section className="w-full py-20 bg-[#0D0F12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
            Graph Topography
          </span>
          <h2 className="text-3xl sm:text-4xl text-[#F8F9FA] font-bold mt-2">
            People connect through shared interests.
          </h2>
          <p className="text-base text-[#94A3B8] mt-3">
            Explore how conversations bridge people, topics, and communities seamlessly without rigid platform silos.
          </p>
        </div>

        {/* Graph Container Canvas */}
        <div className="relative w-full h-[480px] rounded-2xl bg-[#181B21] border border-white/[0.08] shadow-2xl p-6 flex items-center justify-center overflow-hidden">
          
          {/* SVG Connecting Web */}
          <svg className="absolute inset-0 w-full h-full stroke-white/[0.08]" fill="none" viewBox="0 0 900 460">
            {/* Connectors from center */}
            <line stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1.5" x1="450" y1="230" x2="220" y2="120"></line>
            <line stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1.5" x1="450" y1="230" x2="680" y2="110"></line>
            <line stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1.5" x1="450" y1="230" x2="230" y2="340"></line>
            <line stroke="rgba(245, 158, 11, 0.45)" strokeWidth="1.5" x1="450" y1="230" x2="670" y2="350"></line>
            
            {/* Cross-circle links */}
            <line stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="4 4" strokeWidth="1" x1="220" y1="120" x2="680" y2="110"></line>
            <line stroke="rgba(255, 255, 255, 0.12)" strokeDasharray="4 4" strokeWidth="1" x1="230" y1="340" x2="670" y2="350"></line>
            
            {/* Orbit lines */}
            <circle cx="450" cy="230" r="180" stroke="rgba(245, 158, 11, 0.15)" strokeDasharray="3 6" strokeWidth="1"></circle>
            <circle cx="450" cy="230" r="90" stroke="rgba(245, 158, 11, 0.25)" strokeDasharray="2 4" strokeWidth="1"></circle>
          </svg>

          {/* Center Epicenter Node */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#f59e0b] to-[#ff9837] p-1 shadow-[0_0_50px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-110 transition-transform">
              <div className="w-full h-full rounded-full bg-[#08090B] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ffc174] text-[34px]">hub</span>
              </div>
            </div>
            <span className="mt-2 text-sm text-[#F8F9FA] font-bold">Chai Nexus</span>
            <span className="text-[11px] text-[#ffc174]">342 active bridges</span>
          </div>

          {/* Sub Hubs */}
          {hubs.map((hub) => (
            <div
              key={hub.id}
              onClick={() => setSelectedHub(selectedHub === hub.id ? null : hub.id)}
              className={`absolute ${hub.position} flex flex-col items-center cursor-pointer group transition-all duration-300 z-10`}
            >
              <div
                className={`w-14 h-14 rounded-full bg-[#1f2022] border-2 ${hub.color} flex items-center justify-center group-hover:scale-110 shadow-lg transition-transform ${
                  selectedHub === hub.id ? hub.activeColor : 'text-[#ffc174]'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">{hub.icon}</span>
              </div>
              <span className="mt-1.5 text-xs text-[#F8F9FA] font-semibold">{hub.name}</span>
              <span className="text-[10px] text-[#64748B]">{hub.nodes}</span>
            </div>
          ))}

          {/* Interactive Status Overlay */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-[#08090B]/90 border border-white/[0.08] shadow-2xl backdrop-blur-md flex items-center gap-3 text-xs">
            <span className="flex items-center gap-2 text-[#EDEDED]">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping"></span>
              Cross-circle pollination:{" "}
              <strong className="text-[#ffc174]">Designers + Engineers</strong> currently co-building
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CommunityGraph;
