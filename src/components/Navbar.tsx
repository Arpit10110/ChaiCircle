import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ExploreIcon from '@mui/icons-material/Explore';
import { useEffect, useState } from 'react';
import {isauth} from '../middleware/isauth';
const Navbar = () => {
  const isuser = localStorage.getItem("token")==null? false:localStorage.getItem("token")
  const [User,SetUser] = useState(isuser)
  useEffect(() => {
     const finduservalid = async()=>{
      const data = await isauth()
      SetUser(data)
     }
     finduservalid();
  }, [])
  

  return (
    <>
      <div className="flex items-center py-[2rem] px-[2rem] justify-between   " >
        <h1 className="text-[3rem] metal-font text-[#f3771e] " >ChaiCircle</h1>
        <div className="flex gap-[3rem] items-center " >
          <Link to="/" title="home" ><HomeIcon className="!text-[2.5rem]  hover:scale-[1.1] transition-all"  /></Link>
          <Link to="/explore" title="explore"><ExploreIcon className="!text-[2.5rem]  hover:scale-[1.1] transition-all "  /></Link>
          <Link to="/addfriends" title="addfriends"><PersonSearchIcon className="!text-[2.5rem]  hover:scale-[1.1] transition-all "  /></Link>
          <Link to="/message" title="message"><ChatIcon className="!text-[2.5rem]  hover:scale-[1.1] transition-all "  /></Link>
          {
            User?
            <Link to={`/${isuser}`} className="text-white bg-[#f3771e] text-[2rem] px-[1rem] rounded-[5px] hover:scale-[1.05] transition-all " title="profile">Profile</Link>:
            <Link to="/login" className="text-white bg-[#f3771e] text-[2rem] px-[1rem] rounded-[5px] hover:scale-[1.05] transition-all " title="login">Login</Link>
          }
        </div>
      </div>
    </>
  );
};

export default Navbar;
