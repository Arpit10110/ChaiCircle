import React from 'react';

interface TopicBarProps {
  onSelectTopic?: (topic: string) => void;
}

const topics = [
  "# Technology",
  "# Design & Craft",
  "# Indie Music",
  "# Solo Startups",
  "# Cinema & Anime",
  "# Philosophy",
  "# Photography",
  "# Open Source",
  "# Tea & Roasts",
  "# WebGL & Shaders",
  "# Book Club",
  "# Indie Hackers"
];

const TopicBar: React.FC<TopicBarProps> = ({ onSelectTopic }) => {
  // Duplicate for seamless infinite loop
  const marqueeTopics = [...topics, ...topics];

  return (
    <section className="w-full bg-[#0D0F12] py-3.5 border-y border-white/[0.06] shadow-sm overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Label */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse"></span>
            <span className="text-xs sm:text-sm text-[#94A3B8] font-medium whitespace-nowrap">
              Explore spheres of interest:
            </span>
          </div>

          {/* Infinite Marquee Track with Side Fades */}
          <div className="relative flex-1 w-full overflow-hidden mx-0 md:mx-4">
            {/* Left fade gradient */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#0D0F12] to-transparent z-10"></div>
            
            {/* Right fade gradient */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#0D0F12] to-transparent z-10"></div>

            {/* Scrolling Marquee Content */}
            <div className="animate-marquee flex items-center gap-2.5 py-1">
              {marqueeTopics.map((topic, index) => (
                <button
                  key={`${topic}-${index}`}
                  onClick={() => onSelectTopic && onSelectTopic(topic)}
                  className="px-4 py-1.5 rounded-full bg-[#181B21] border border-white/[0.08] text-[#EDEDED] hover:text-[#ffc174] hover:bg-[#1f2022] hover:border-[#f59e0b]/40 text-xs font-medium transition-all shrink-0 cursor-pointer active:scale-95 shadow-sm"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Badge */}
          <div className="shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181B21] border border-white/[0.08] text-xs text-[#94A3B8] whitespace-nowrap">
            <span className="text-[#ffc174] font-bold">48,290+</span> conversations this week
          </div>

        </div>
      </div>
    </section>
  );
};

export default TopicBar;
