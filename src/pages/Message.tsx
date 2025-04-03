import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';


interface AllChatdata{
    message:string,
    sender:string,
    users:string[]
}


const Message = () => {

    const [IsLoading, SetIsLoading] = useState(false)
    const [Isuser,SetIsUser] = useState(false)
    const [FriendList, SetFriendList] = useState([])
    const [SelectedFriend,SetSelectFriend] = useState("")
    const [SendMessage, SetSendMessage] = useState("");
    const [ALlChat, SetAllChat] = useState([]);
    const [AdminUsername, SetAdminUsername] = useState("");

    const getuserdata = async()=>{
        try {
            SetIsLoading(true)
            const  {data} = await axios.get(`${import.meta.env.VITE_HOST}/getuserdata`,{withCredentials:true})
            if(data.success==false){
                SetIsUser(false)
            }else{
                SetIsUser(true)
                SetAdminUsername(data.adminusername)
                SetFriendList(data.userdata.friends)
            }
            console.log(data);
            SetIsLoading(false)

        } catch (error) {
            console.error(error)
            SetIsLoading(false)
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])
    
  const addmessage = async(e:any)=>{
    e.preventDefault();
        try {
            const  {data} = await axios.post(`${import.meta.env.VITE_HOST}/addmessage`,{content:SendMessage,receiver:SelectedFriend},{withCredentials:true})
            console.log(data);
        }catch(e) {
            console.error(e)
        }
  }
    
  const getallmessage = async(i:string)=>{
        SetSelectFriend(i)
        try {
            const  {data} = await axios.post(`${import.meta.env.VITE_HOST}/getallmessage`,{receiver:i},{withCredentials:true})
            console.log(data.messages);
            SetAllChat(data.messages)
        }catch(e) {
            console.error(e)
        }
  }
    
    

  return (
    <>
        <Navbar/>
        {
            IsLoading?
            <Loading/>:
        <>
            {
                Isuser?
                <div className='flex w-full h-[84vh] ' >
                    <div className='scroll overflow-y-scroll flex flex-col gap-[1.5rem] w-[30%] h-full border-r-[1px] border-gray-400 items-center py-[2rem]  ' >
                        <h1 className='text-[2rem] w-[90%] font-[600] text-gray-300' >Friends</h1>
                        {
                            FriendList.map((i:string,index:number)=>{
                                return(
                                    <div  key={index} onClick={()=>getallmessage(i)}  className='w-[90%] bg-gray-800 flex justify-between rounded-[5px] cursor-pointer hover:scale-[1.03] transition-all  px-[1rem] py-[0.3rem] ' >
                                        <h3 className=' text-[2rem] text-start' >👤{i}</h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-[70%]' >
                        {
                            SelectedFriend==""?
                            <div className='w-full h-full justify-center items-center flex ' >
                                <h1 className='text-[2rem] font-semibold text-gray-100 ' >Select a Friend to Start the Chat </h1>
                            </div>:
                            <div className='flex flex-col h-full ' >
                                <h1 className='bg-gray-800 w-full text-[1.5rem] pl-[1rem] py-[0.3rem] ' >👤{SelectedFriend}</h1>
                                <div id='messagebox' className='w-full flex flex-col gap-[2rem]  h-[100%] py-[1rem] px-[0.5rem]  ' >
                                   {
                                    ALlChat.map((i:AllChatdata,index:any)=>{
                                        return(
                                            <div key={index} className={i.sender == AdminUsername ? "flex items-end justify-end" : "flex items-start justify-start"}>
                                            <h2 className={`text-[1.5rem] max-w-[90%] px-[1rem] py-[0.4rem] ${i.sender == AdminUsername ? "bg-green-700 rounded-bl-[1rem]" : "bg-blue-700 rounded-br-[1rem]"}`}>
                                                {i.message}
                                            </h2>
                                        </div>
                                        )
                                    })
                                   }
                                </div>
                                <form onSubmit={addmessage} className='w-full justify-around flex ' >
                                    <input type="text" value={SendMessage} onChange={(e)=>SetSendMessage(e.target.value)} className='w-[89%] p-[0.4rem] bg-white font-semibold text-[1.5rem] text-black ' />
                                    <button className='w-[10%] bg-gray-900 py-[0.4rem] !text-[1.5rem] cursor-pointer ' >
                                        <SendIcon className='!text-[1.7rem] ' />
                                    </button>
                                </form>
                            </div>
                        }
                    </div>
                </div>:
                <div className='flex justify-center items-center h-[50vh] ' >
                    <Link  className='text-[2rem] m-auto px-[2rem] py-[0.4rem] bg-blue-500 rounded-[5px] ' to={"/login"} >Please Login</Link>
                </div>
            }
        </>
        }
    </>
  )
}

export default Message