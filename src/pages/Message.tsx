import { useEffect, useState, useContext } from 'react'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { SocketContext } from '../Context/SocketContext';
interface SocketContextType {
    name: string;
    isUser: boolean;
    onlineUsers: any[];
    setupSocketUser: (username: string) => void;
    sendmessage: (username: string, message: string) => void;
}
const Message = () => {
    const socketContext = useContext(SocketContext) as SocketContextType | undefined;
    const onlineUsers = socketContext?.onlineUsers || []; 
    const sendmessagefun = socketContext?.sendmessage 

    const [IsLoading, SetIsLoading] = useState(false)
    const [Isuser,SetIsUser] = useState(false)
    const [FriendList, SetFriendList] = useState([])
    const [SelectedFriend,SetSelectFriend] = useState("")
    const [SendMessage, SetSendMessage] = useState("");

    const getuserdata = async()=>{
        try {
            SetIsLoading(true)
            const  {data} = await axios.get(`${import.meta.env.VITE_HOST}/getuserdata`,{withCredentials:true})
            if(data.success==false){
                SetIsUser(false)
            }else{
                SetIsUser(true)
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
    console.log(onlineUsers);

        getuserdata();
    }, [])
    
    const sendmessage = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!sendmessagefun) {
            console.error("sendmessagefun is not defined");
            return;
        }
        
        if (!SendMessage.trim()) {
            console.error("Message cannot be empty");
            return;
        }
    
        const messagebox = document.getElementById('messagebox');
        if (!messagebox) return;
    
        // Create sender message bubble
        const senderdiv = document.createElement("div");
        senderdiv.classList.add("flex", "items-end", "justify-end");
    
        const h2 = document.createElement("h2");
        h2.classList.add("text-[1.5rem]", "bg-green-700", "max-w-[90%]", "px-[1rem]", "rounded-bl-[1rem]", "py-[0.4rem]");
        h2.textContent = SendMessage;
    
        senderdiv.appendChild(h2);
        messagebox.appendChild(senderdiv);
    
        sendmessagefun(SelectedFriend, SendMessage);
        SetSendMessage(""); // Clear input after sending
    };
    

    // useEffect(() => {
    //     if (!socketContext?.socket) return;
    
    //     const handleReceiveMessage = ({ sender, message }: { sender: string; message: string }) => {
    //         console.log("Received message from:", sender, message);
    
    //         const messagebox = document.getElementById('messagebox');
    //         if (!messagebox) return;
    
    //         const receiveddiv = document.createElement("div");
    //         receiveddiv.classList.add("flex", "items-start", "justify-start");
    
    //         const h2 = document.createElement("h2");
    //         h2.classList.add("text-[1.5rem]", "bg-blue-700", "max-w-[90%]", "px-[1rem]", "rounded-br-[1rem]", "py-[0.4rem]");
    //         h2.textContent = message;
    
    //         receiveddiv.appendChild(h2);
    //         messagebox.appendChild(receiveddiv);
    //     };
    
    //     socketContext.socket.on("recivemessage", handleReceiveMessage);
    
    //     return () => {
    //         socketContext.socket?.off("recivemessage", handleReceiveMessage);
    //     };
    // }, [socketContext?.socket]);
    
    

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
                                    <div  key={index} onClick={()=>SetSelectFriend(i)}  className='w-[90%] bg-gray-800 flex justify-between rounded-[5px] cursor-pointer hover:scale-[1.03] transition-all  px-[1rem] py-[0.3rem] ' >
                                        <h3 className=' text-[2rem] text-start' >👤{i}</h3>
                                        {
                                            onlineUsers.includes(i)?
                                            <h3 className='text-[1.1rem] font-semibold text-green-500' >online</h3>:
                                            <h3 className='text-[1.1rem] font-semibold text-gray-500' >offline</h3>
                                        }
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
                                   
                                </div>
                                <form onSubmit={sendmessage} className='w-full justify-around flex ' >
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