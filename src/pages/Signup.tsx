import Navbar from '../components/Navbar';
import Signupbox from '../components/Signupbox.tsx';
import Footer from '../components/Footer';

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#08090B] text-[#e3e2e5] font-['Geist'] selection:bg-[#f59e0b]/30 selection:text-[#ffc174] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <Signupbox />
      </main>
      <Footer />
    </div>
  );
};

export default Signup;