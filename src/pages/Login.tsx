import Navbar from "../components/Navbar";
import LoginBox from "../components/LoginBox.tsx";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#08090B] text-[#e3e2e5] font-['Geist'] selection:bg-[#f59e0b]/30 selection:text-[#ffc174] flex flex-col justify-between">
      <Navbar />
      <main className="flex-1 flex flex-col justify-center">
        <LoginBox />
      </main>
      <Footer />
    </div>
  );
};

export default Login;