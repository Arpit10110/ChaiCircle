import { Link } from 'react-router-dom';
import Sec1img from "../assets/sec1Img.png"
const Sec1 = () => {
  return (
   <>
    <div className='flex my-[5rem] flex-wrap items-center  justify-around   ' >
        <div className='w-[50%] flex flex-col gap-[1.5rem]  ' >
            <h1 className='text-[3rem] font-semibold w-[90%]  '>Brew Conversations🍵, Build Connections!</h1>
            <p className='w-full text-[1.5rem] ' >ChaiCircle is your digital chai adda! Share your favorite moments, connect with new friends, and chat in real-time. Whether it's posting snapshots, liking and commenting, or just vibing over chai-fueled conversations, this is where your social journey begins.</p>
            <Link className='text-[1.5rem] hover:scale-[1.02] transition-all font-bold px-[1.5rem] bg-[#f3771e] py-[0.4rem] w-fit rounded-[5px]  ' to="/explore" >Explore Now</Link>
        </div>
        <div className='w-[30%]' >
            <img className='w-full'  src={Sec1img} alt="ChaiCircle" />
        </div>
    </div>
   </>
  )
}

export default Sec1