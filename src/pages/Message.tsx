import { useEffect, useState, useRef } from 'react'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { io } from "socket.io-client"
import send from "../assets/sending.mp3"
import recive from "../assets/recive.mp3"
import useSound from 'use-sound';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Drawer } from '@mui/material';
interface AllChatdata {
    message: string,
    sender: string,
    users: string[]
}

const Message = () => {
    const socketRef = useRef<any>(null); // Use a ref to manage the socket instance
    const [IsLoading, SetIsLoading] = useState(false)
    const [Isuser, SetIsUser] = useState(false)
    const [FriendList, SetFriendList] = useState([])
    const [SelectedFriend, SetSelectFriend] = useState("")
    const [SendMessage, SetSendMessage] = useState("");
    const [ALlChat, SetAllChat] = useState<AllChatdata[]>([]); // Explicitly define the type as AllChatdata[]
    const [AdminUsername, SetAdminUsername] = useState("");
    const [OnlineFriends, SetOnlineFriends] = useState([""]);
    const messageBoxRef = useRef<HTMLDivElement | null>(null);
    const [playsend] = useSound(send);
    const [playrecive] = useSound(recive);
    const [open, setOpen] = useState(false);
    const [Dopen, setDOpen] = useState(false);

    const getuserdata = async () => {
        try {
            SetIsLoading(true)
            const { data } = await axios.get(`${import.meta.env.VITE_HOST}/getuserdata`, { withCredentials: true })
            if (data.success == false) {
                SetIsUser(false)
            } else {
                SetIsUser(true)
                SetAdminUsername(data.adminusername)
                SetFriendList(data.userdata.friends)
                setupusers(data.adminusername)
            }
            SetIsLoading(false)

        } catch (error) {
            console.error(error)
            SetIsLoading(false)
        }
    }

    useEffect(() => {
        getuserdata();
    }, [])

    const addmessage = async (sendmessage:string) => {
        SetSendMessage("")
        try {
            await axios.post(`${import.meta.env.VITE_HOST}/addmessage`, { content: sendmessage, receiver: SelectedFriend }, { withCredentials: true })
            SetSendMessage("");
        } catch (e) {
            console.error(e)
        }
    }

    const getallmessage = async (i: string) => {
        SetSelectFriend(i)
        setOpen(true)
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_HOST}/getallmessage`, { receiver: i }, { withCredentials: true })
            SetAllChat(data.messages)
            setOpen(false)
        } catch (e) {
            setOpen(false)
            console.error(e)
        }
    }

    const scrollToBottom = () => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [ALlChat]);

    //socket
    useEffect(() => {
        // Initialize socket connection once
        socketRef.current = io(import.meta.env.VITE_HOST);

        return () => {
            // Cleanup socket connection on component unmount
            socketRef.current.disconnect();
        };
    }, []);

    const setupusers = (user: string) => {
        socketRef.current.emit("setupuser", user);
        socketRef.current.on("onlineusers", (data:any) => {
            SetOnlineFriends(data);
        });
    };

    useEffect(() => {
        const handleReceiveMessage = ({ message, sender }: AllChatdata) => {
            playrecive();
            SetAllChat((prev) => [...prev, { message, sender, users: [] }]); // Update state instead of DOM manipulation
            scrollToBottom();
        };

        socketRef.current.on("recivemessage", handleReceiveMessage);

        return () => {
            socketRef.current.off("recivemessage", handleReceiveMessage); // Cleanup listener
        };
    }, []);

    const socketsendmessage = (e: any) => {
        e.preventDefault();

        if (!SendMessage.trim()) return; // Prevent sending empty messages

        SetAllChat((prev) => [
            ...prev,
            { message: SendMessage, sender: AdminUsername, users: []}, // Ensure 'users' is an empty array of strings
        ]); // Optimistically update chat UI

        socketRef.current.emit("sendmessage", {
            reciver: SelectedFriend,
            sender: AdminUsername,
            message: SendMessage,
        });

        scrollToBottom();
        playsend();
        addmessage(SendMessage)
    };

    return (
        <>
         <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={open}
                  >
                    <CircularProgress color="inherit" />
                  </Backdrop>
            <Navbar />
            <Drawer  anchor={"left"} open={Dopen} onClose={()=>setDOpen(false)}>
                <div className="w-[50vw] h-[100vh] bg-gray-900 text-white flex flex-col gap-[2rem] items-center pt-[3rem] overflow-y-scroll " >
                {
                                            FriendList.map((i: string, index: number) => {
                                                return (
                                                    <div key={index} onClick={() =>{
                                                        getallmessage(i)
                                                        setDOpen(false)
                                                    }} className='w-[95%] bg-gray-800 flex justify-between rounded-[5px] cursor-pointer hover:scale-[1.03] transition-all  px-[1rem] py-[0.3rem] ' >
                                                        <h3 className=' text-[2rem] text-start' >👤{i}</h3>
                                                        {
                                                            OnlineFriends.includes(i) ?
                                                                <h3 className='text-[1.1rem] font-semibold text-green-500' >online</h3> :
                                                                <h3 className='text-[1.1rem] font-semibold text-gray-500' >offline</h3>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                </div>
            </Drawer>
            {
                IsLoading ?
                    <Loading /> :
                    <>
                        {
                            Isuser ?
                                <div className='flex w-full h-[84vh]  flex-wrap max-[950px]:h-fit max-[950px]:mb-[1rem] ' >
                                    <div className='scroll overflow-y-scroll flex flex-col gap-[1.5rem] w-[30%] h-full border-r-[1px] border-gray-400 items-center py-[2rem]  max-[950px]:hidden ' >
                                        <h1 className='text-[2rem] w-[90%] font-[600] text-gray-300' >Friends</h1>
                                        {
                                            FriendList.map((i: string, index: number) => {
                                                return (
                                                    <div key={index} onClick={() => getallmessage(i)} className='w-[90%] bg-gray-800 flex justify-between rounded-[5px] cursor-pointer hover:scale-[1.03] transition-all  px-[1rem] py-[0.3rem] ' >
                                                        <h3 className=' text-[2rem] text-start' >👤{i}</h3>
                                                        {
                                                            OnlineFriends.includes(i) ?
                                                                <h3 className='text-[1.1rem] font-semibold text-green-500' >online</h3> :
                                                                <h3 className='text-[1.1rem] font-semibold text-gray-500' >offline</h3>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='hidden max-[950px]:flex ' >
                                        <button onClick={()=>setDOpen(true)} className='px-[1.8rem] py-[0.3rem] bg-[#f3771e] text-[1.5rem] ml-[1rem] rounded-[5px] font-semibold ' >All Firends</button>
                                    </div>
                                    <div className='w-[70%] h-full max-[950px]:w-[99%] max-[950px]:mt-[2rem] max-[950px]:m-auto ' >
                                        {
                                            SelectedFriend == "" ?
                                                <div className='w-full h-full justify-center items-center flex max-[950px]:h-[50vh] ' >
                                                    <h1 className='text-[2rem] font-semibold text-gray-100 ' >Select a Friend to Start the Chat </h1>
                                                </div> :
                                                <div className='flex flex-col h-full ' >
                                                    <h1 className='bg-gray-800 w-full text-[1.5rem] pl-[1rem] py-[0.3rem] ' >👤{SelectedFriend}</h1>
                                                    <div id='messagebox' ref={messageBoxRef} className=' scroll w-full overflow-y-scroll  flex flex-col gap-[2rem]  h-[90%] py-[1rem] px-[0.5rem] max-[950px]:h-[67vh]   ' >
                                                        {
                                                            ALlChat.map((i: AllChatdata, index: any) => {
                                                                return (
                                                                    <div key={index} className={i.sender == AdminUsername ? "flex items-end justify-end" : "flex items-start justify-start"}>
                                                                        <h2 className={`text-[1.5rem] max-w-[90%] px-[1rem] py-[0.4rem] ${i.sender == AdminUsername ? "bg-green-700 rounded-bl-[1rem]" : "bg-blue-700 rounded-br-[1rem]"}`}>
                                                                            {i.message}
                                                                        </h2>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <form onSubmit={socketsendmessage} className='w-full justify-around flex ' >
                                                        <input type="text" value={SendMessage} onChange={(e) => SetSendMessage(e.target.value)} className='w-[89%] p-[0.4rem] bg-white font-semibold text-[1.5rem] text-black ' />
                                                        <button className='w-[10%] bg-gray-900 py-[0.4rem] !text-[1.5rem] cursor-pointer ' >
                                                            <SendIcon className='!text-[1.7rem] ' />
                                                        </button>
                                                    </form>
                                                </div>
                                        }
                                    </div>
                                </div> :
                                <div className='flex justify-center items-center h-[50vh] ' >
                                    <Link className='text-[2rem] m-auto px-[2rem] py-[0.4rem] bg-blue-500 rounded-[5px] ' to={"/login"} >Please Login</Link>
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default Message