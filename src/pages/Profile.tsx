import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { useParams, Link } from 'react-router-dom';
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
interface userdata{
  username:string,
  dp:string,
  name:string
};

const Profile = () => {
  const navigate = useNavigate();
const param = useParams();
const [IsLoading,SetIsLoading]  = useState(true);
const [Isuseradmin,SetIsuseradmin]  = useState(false);
const [Userdata,SetUserdata]  =useState<userdata>({ username: "", dp: "", name: "" });


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
   }, [param.id])
      
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

  return (
    <>
      <Navbar/>
      {
        IsLoading?
        <Loading/>:
        <div>
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
                           <h3>0 followers</h3>
                       </div>
                       <div>
                           <h3>0 following</h3>
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
                <Link to={"/createpost"} className="px-[2rem] py-[0.5rem] bg-gray-900 rounded-[5px] text-[1.5rem]" >Create New Post</Link>
              </div>:""
            }
        </div>
      }
   </>
  )
}

export default Profile