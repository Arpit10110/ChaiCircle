import React from 'react';
import Navbar from '../components/Navbar.tsx';
import HeroSection from '../components/stitch/HeroSection.tsx';
import TopicBar from '../components/stitch/TopicBar.tsx';
import EditorialContrast from '../components/stitch/EditorialContrast.tsx';
import DiscoverGrid from '../components/stitch/DiscoverGrid.tsx';
import ConversationShowcase from '../components/stitch/ConversationShowcase.tsx';
import BentoGrid from '../components/stitch/BentoGrid.tsx';
import WhyChaiCircle from '../components/stitch/WhyChaiCircle.tsx';
import CommunityGraph from '../components/stitch/CommunityGraph.tsx';
import PhilosophyAndCTA from '../components/stitch/PhilosophyAndCTA.tsx';
import Footer from '../components/Footer.tsx';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#08090B] text-[#e3e2e5] font-['Geist'] selection:bg-[#f59e0b]/30 selection:text-[#ffc174] overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <HeroSection />
        <TopicBar />
        <EditorialContrast />
        <DiscoverGrid />
        <ConversationShowcase />
        <BentoGrid />
        <WhyChaiCircle />
        <CommunityGraph />
        <PhilosophyAndCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Home;