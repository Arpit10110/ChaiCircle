import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
interface userdata{
  username:string,
  dp:string,
  name:string,
  friends?:[],
  _id?:string
};

interface postdatatye{
  comments:[],
  likes:number,
  caption:string,
  username:string,
  imageurl:string,
  _id:string
}

const Profile = () => {
  const navigate = useNavigate();
const param = useParams();
const [IsLoading,SetIsLoading]  = useState(true);
const [Isuseradmin,SetIsuseradmin]  = useState(false);
const [Userdata,SetUserdata]  =useState<userdata>({ username: "", dp: "", name: "" });
const [Post,SetPost] = useState([]);
const [refresh, setRefresh] = useState(false);

  const getprofiledata = async(username:string)=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_HOST}/getprofile`,{
        username: username
      },{
        withCredentials: true
      })
      console.log(data)
      SetIsuseradmin(data.isuseradmin)
      SetUserdata(data.userdata)
      SetPost(data.post)
      SetIsLoading(false);
    } catch (error) {
      console.log(error)
    }
  }

  const sendfriendreq = async()=>{
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_HOST}/sendfriendreq`,{
        to:param.id,
      },{
        withCredentials:true
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

   useEffect(() => {
        getprofiledata(String(param.id));
   }, [param.id,refresh])
      
   const logout = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_HOST}/logout`,{
        withCredentials:true
      })
      console.log(data)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
   }

   const deletepost = async(id:string)=>{
    try {
      console.log(id)
      const {data} = await axios.post(`${import.meta.env.VITE_HOST}/deletepost`,{
        id:id
      },{
        withCredentials:true
      })
      setRefresh(!refresh);
    } catch (error) {
      console.log(error)
    }
   }

  return (
    <>
      <Navbar/>
      {
        IsLoading?
        <Loading/>:
        <div className="mb-[15rem]" >
            <div className=" border-b-[1px] flex flex-col gap-[2rem] justify-center w-[60%] m-auto border-gray-500 pb-[2rem] " >
              <div className="flex gap-[5rem] w-full justify-center " >
                <div className="w-[15%] flex items-center " >
                  <img loading="lazy" className="rounded-[50%] w-[100%] object-cover " src={Userdata.dp} alt="UserProfile" />
                </div>
                  <div className="w-[60%] flex flex-col gap-[1rem]  justify-center text-[2rem] " >
                    <h2>{Userdata.username}</h2>
                    <div className="flex gap-[4rem] " >
                       <div>
                           <h3>0 post</h3>
                       </div>
                       <div>
                           <h3>{Userdata.friends?.length} followers</h3>
                       </div>
                       <div>
                           <h3>{Userdata.friends?.length} following</h3>
                       </div>
                    </div>
                  </div>
              </div>
              {
                Isuseradmin?
              <div className="flex gap-[3rem]  w-fit  " >
                 <Link className="px-[2.5rem] py-[0.7rem] bg-gray-900 rounded-[5px] text-[1.3rem] font-semibold "  to={"/editprofile/id"} >Edit Profile </Link>
                 <button onClick={logout} className="px-[3rem] cursor-pointer py-[0.7rem] bg-gray-900 rounded-[5px] text-[1.3rem] font-semibold " >LogOut</button>
              </div>:
              <div className="flex gap-[3rem]  " >
                  <button onClick={sendfriendreq} className="px-[3rem] py-[0.5rem] bg-blue-500 rounded-[5px] text-[1.5rem] font-semibold" >ADD Friend </button>
              </div>
              }
            </div>
            {
              Isuseradmin?
              <div className="w-[60%]  m-auto flex items-end justify-end mt-[1rem] " >
                <Link to={`/createpost/${Userdata._id}`} className="px-[2rem] py-[0.5rem] bg-gray-900 rounded-[5px] text-[1.5rem]" >Create New Post</Link>
              </div>:""
            }
            <div className="w-[60%] m-auto mt-[2rem] flex flex-wrap justify-between gap-y-[3rem] px-[2rem] " >
                 {
                  Post.length>0?
                  <>
                    {
                      Post.map((i:postdatatye,index:number)=>{
                        return(
                            <div key={index} className="bg-gray-900 flex flex-col gap-[0.5rem] p-[0.5rem]  w-[45%]   rounded-[5px] " >
                                <div className="border-b-[1px] pb-[5px] border-gray-500 flex justify-between items-center " >
                                  <h2 className="text-[1.5rem] font-semibold " > 👤 {i.username}</h2>
                                  <button onClick={()=>deletepost(i._id)} >
                                    <DeleteIcon  className="!text-[2rem] !cursor-pointer hover:scale-[1.05] transition-all text-red-600 " />
                                  </button>
                                </div>
                                <div className=" w-full h-[50vh]  " >
                                  <img className="w-[100%] h-[50vh] object-contain  " src={i.imageurl} alt="Image" />
                                </div>
                                <div className="border-t-[1px] mt-[5px]  border-gray-500 flex flex-col gap-[0.5rem] " >
                                    <h1 className="text-[1.5rem] font-semibold " >{i.caption}</h1>
                                    <div className="flex w-full justify-around  bg-[#ffffff1a] py-[0.5rem] rounded-[5px]   " >
                                      <FavoriteBorderIcon className="!text-[2rem] !cursor-pointer hover:scale-[1.05] transition-all " />
                                      <ChatBubbleOutlineSharpIcon className="!text-[2rem] !cursor-pointer hover:scale-[1.05] transition-all " />
                                      <button
                                        onClick={() => {
                                          const message = `Check out this post by ${i.username}: ${i.caption} - https://chaicircle.vercel.app/#/${i.username}`;
                                          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                                          window.open(whatsappUrl, "_blank");
                                        }}
                                      >
                                        <ShareIcon className="!text-[2rem] !cursor-pointer hover:scale-[1.05] transition-all " />
                                      </button>
                                    </div>
                                </div>
                            </div>
                        )
                      })
                    }
                  </>:
                  <h3 className=" w-full text-center text-[2rem] font-bold " >!!! No Posts Yet !!! </h3>
                 }
            </div>
        </div>
      }
   </>
  )
}

export default Profile