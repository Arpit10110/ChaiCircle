import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
   <>
    <div className="mt-[8rem] bg-gray-900 py-[3rem] flex px-[3rem]  " >
        <div className='flex gap-[5rem] w-[60%] ' >
                <div className='flex flex-col gap-[15px] text-[1.2rem]' >
                    <h3 className='text-[#FF6F38] font-semibold text-[1.35rem]'>Connect With Us Online</h3>
                    <a href="https://www.instagram.com/___arpit_._/"><InstagramIcon/> Instagram</a>
                    <a href="https://github.com/Arpit10110"><GitHubIcon/> Github</a>
                    <a href="https://www.linkedin.com/in/arpit-agrahari-54aa192a1/"><LinkedInIcon/> LinkedIn</a>
                    <a href="https://x.com/ArpitAgrahari26?t=IyDaE6R8sNL10VQlozEYrQ&s=09"><XIcon/> Twitter</a>
                    <a href="https://www.facebook.com/arpit.agrahari.5"><FacebookIcon/> Facebook</a>
                </div>
                <div className='flex flex-col gap-[15px] text-[1.2rem]'>
                    <h3><span className='text-[#FF6F38]  font-semibold text-[1.35rem]'> Meet the Creator </span>🧡</h3>
                    <h4>Arpit Agrahari</h4>
                    <a href="tel:+919599056856">Contact Number</a>
                    <a href="mailto:omagrahari55@gmail.com">Email</a>
                    <a href="https://arpitdev.vercel.app/">Portfolio</a>
                </div>
                <div className='flex flex-col gap-[15px] text-[1.2rem]'>
                    <h3 className='text-[#FF6F38] font-semibold text-[1.35rem]'>Quick Links</h3>
                    <Link to={"/"} >Home</Link>
                    <Link to={"/explore"}>Explore</Link>
                    <Link to={"/addfriends"}>Add Friends</Link>
                    <Link to={"/message"}>Message</Link>
                </div>
        </div>
        <div className='w-[40%] items-center justify-center flex flex-col ' >
            <h1 className="text-[5rem] metal-font text-[#f3771e] " >ChaiCircle</h1>
            <h3 className="text-[1rem] text-gray-200 font-bold ">© 2025 ChaiCircle. All rights reserved.</h3>
        </div>
    </div>
   </>
  )
}

export default Footer