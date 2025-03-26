import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios";
import { Link } from 'react-router-dom';

const AddFriend = () => {
  const isuser = localStorage.getItem("token")==null? false:localStorage.getItem("token")
  const [UserName,SetUserName] = useState("");
  const [Searchdata,SetSearchdata] = useState([]);
  const [Message,SetMessage] = useState("")
  const [showreqbtn,Setshowreqbtn] = useState(false);
  const [reqdata,Setreqdata] = useState([]);


  const finduser = async(e:any)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_HOST}/finduser`,{username:UserName})
      SetSearchdata(data.users);
      if(data.users.length==0){
        SetMessage("No users found...");
      }
    } catch (error) {
      console.log(error);
    }
  }


  const findallreq = async()=>{
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_HOST}/getrequests`,{withCredentials:true})
      console.log(data);
      // Setreqdata(data.requests);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   if(isuser==false){
      Setshowreqbtn(false)
   }else{
    Setshowreqbtn(true)
   }
  }, [])
  

  
  return (
    <>
        <Navbar/>
        <div>
            <form onSubmit={finduser} className="w-full flex gap-[2rem] items-center justify-center max-[600px]:gap-[1rem]  " >
                <input value={UserName} onChange={(e)=>SetUserName(e.target.value.toLowerCase())}  className="w-[90%] max-[600px]:w-[80%]     bg-white text-black text-[1.5rem] p-[0.4rem] rounded-[5px]   " placeholder="Enter a username to find friends...🔍" type="text" required/>
                <button className="px-[2rem] max-[600px]:px-[1rem]  bg-[#f3771e] font-bold py-[0.6rem] rounded-[5px] cursor-pointer hover:scale-[1.02] transition-all  text-[1.5rem] " >Find</button>
            </form>
        </div>
        <div>
          {
            showreqbtn?
            <div className="w-full flex justify-end pr-[3rem] mt-[2rem]" >
              <button onClick={findallreq} className="text-[1.5rem] px-[1.5rem] cursor-pointer py-[0.3rem] bg-gray-800 rounded-[5px] font-semibold " >Show Request</button>
            </div>:""
          }
        </div>
        <div>
           {Searchdata.length>0? Searchdata.map((user:any,index)=>(
                <div className="flex bg-gray-900 w-[70%] m-auto mt-[3rem] justify-between p-[1.5rem] rounded-[10px] items-center max-[600px]:w-[90%]  " key={index}>
                    <div className="flex items-center gap-[2rem] ">
                       <img className="w-[10%] rounded-[50%] object-cover " src={user.dp} alt="dp" />
                       <h1 className="text-[1.8rem]" >{user.username}</h1>
                    </div>
                    <div className="w-max flex">
                      <Link className="px-[1.5rem] w-max py-[0.4rem] text-[1.3rem] bg-[#1e68f3] font-bold rounded-[5px] " to={`/${user.username}`} >View Profile</Link>
                    </div>
                </div>
            )):<div className="text-[2rem] mt-[5rem] " >
                  <h1 className="text-center">{Message}</h1>
              </div>}
        </div>
    </>
  )
}

export default AddFriend