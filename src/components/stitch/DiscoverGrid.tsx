import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CommunityCard {
  id: string;
  category: 'trending' | 'engineering' | 'design' | 'audio';
  icon: string;
  badge: string;
  badgeType: 'active' | 'tertiary' | 'muted';
  title: string;
  description: string;
  members: string;
  avatars?: string[];
}

const communityData: CommunityCard[] = [
  {
    id: 'frontend',
    category: 'engineering',
    icon: 'terminal',
    badge: 'Voice Room Active',
    badgeType: 'active',
    title: 'Frontend Builders',
    description: 'Deep dives into modern rendering runtimes, high-fidelity micro-interactions, canvas graphics, and zero-latency web tools.',
    members: '12.4k builders',
    avatars: ['/stitch/asset_5.png', '/stitch/asset_6.png']
  },
  {
    id: 'audio-synth',
    category: 'audio',
    icon: 'headphones',
    badge: 'Jamming Now',
    badgeType: 'tertiary',
    title: 'Analog & Synth Beats',
    description: 'Lo-fi tape saturation, Eurorack modular workflows, sample clearance debates, and collaborative weekend jam sessions.',
    members: '5.1k soundmakers',
    avatars: ['/stitch/asset_7.png']
  },
  {
    id: 'bootstrappers',
    category: 'trending',
    icon: 'rocket_launch',
    badge: 'Weekly Standup',
    badgeType: 'muted',
    title: 'Solo Bootstrappers',
    description: 'Transparent revenue sharing, pricing strategy, distribution hacks, and mental fitness for founders building profitable software alone.',
    members: '6.7k bootstrappers',
    avatars: ['/stitch/asset_8.png']
  },
  {
    id: 'typography',
    category: 'design',
    icon: 'palette',
    badge: 'Review Friday',
    badgeType: 'active',
    title: 'Editorial Typography',
    description: 'Curated font specimens, variable font experimentation, book layout grids, and critiques for meticulous visual designers.',
    members: '3.4k typographers'
  },
  {
    id: 'gamedev',
    category: 'engineering',
    icon: 'videogame_asset',
    badge: 'Party Active',
    badgeType: 'muted',
    title: 'Indie Game Devs & Roguelikes',
    description: 'Pixel art assets, Godot shaders, playtesting feedback loops, and cozy late-night cooperative sessions.',
    members: '8.9k gamers'
  },
  {
    id: 'literature',
    category: 'trending',
    icon: 'menu_book',
    badge: 'Book Club',
    badgeType: 'active',
    title: 'Speculative Fiction & Sci-Fi',
    description: 'Dissecting Ted Chiang, Ursula K. Le Guin, solar-punk futures, and hosting asynchronous chapter reading sessions.',
    members: '4.2k readers'
  }
];

const DiscoverGrid: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'engineering' | 'design' | 'audio'>('all');

  const filtered = filter === 'all'
    ? communityData
    : communityData.filter(c => c.category === filter);

  return (
    <section className="w-full py-20 bg-[#0D0F12] relative" id="discover">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#ffc174] font-semibold">
              Community Discovery
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#F8F9FA] font-bold mt-2">
              Something interesting is always brewing.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#181B21] p-1.5 rounded-full border border-white/[0.08] overflow-x-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-[#f59e0b] text-[#2a1700] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-white/[0.05]'
              }`}
            >
              All Circles
            </button>
            <button
              onClick={() => setFilter('engineering')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'engineering'
                  ? 'bg-[#f59e0b] text-[#2a1700] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-white/[0.05]'
              }`}
            >
              Engineering
            </button>
            <button
              onClick={() => setFilter('design')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'design'
                  ? 'bg-[#f59e0b] text-[#2a1700] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-white/[0.05]'
              }`}
            >
              Design & Craft
            </button>
            <button
              onClick={() => setFilter('audio')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                filter === 'audio'
                  ? 'bg-[#f59e0b] text-[#2a1700] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-[#94A3B8] hover:text-[#F8F9FA] hover:bg-white/[0.05]'
              }`}
            >
              Audio / Synth
            </button>
          </div>
        </div>

        {/* Discovery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-[#181B21] border border-white/[0.08] p-6 shadow-md hover:shadow-2xl hover:border-[#f59e0b]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#292a2c] flex items-center justify-center text-[#ffc174] group-hover:bg-[#f59e0b] group-hover:text-[#2a1700] transition-colors duration-200">
                    <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1f2022] border border-white/[0.05] text-xs font-medium text-[#ffc174]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping"></span>
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-xl text-[#F8F9FA] font-bold group-hover:text-[#ffc174] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#94A3B8] mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.avatars && item.avatars.length > 0 ? (
                    <div className="flex -space-x-2">
                      {item.avatars.map((av, idx) => (
                        <img
                          key={idx}
                          className="w-6 h-6 rounded-full object-cover border border-[#181B21]"
                          src={av}
                          alt="Member"
                        />
                      ))}
                      <span className="w-6 h-6 rounded-full bg-[#343537] text-[#94A3B8] text-[10px] flex items-center justify-center font-bold">
                        +
                      </span>
                    </div>
                  ) : null}
                  <span className="text-xs text-[#64748B]">{item.members}</span>
                </div>

                <Link
                  to="/explore"
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1f2022] hover:bg-[#ffc174] hover:text-[#472a00] text-[#F8F9FA] transition-all"
                >
                  Join Circle
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DiscoverGrid;
