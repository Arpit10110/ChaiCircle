import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Loading from '../components/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
const Message = () => {

    const [IsLoading, SetIsLoading] = useState(false)
    const [Isuser,SetIsUser] = useState(false)
    const [FriendList, SetFriendList] = useState([])
    const [SelectedFriend,SetSelectFriend] = useState("")


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
        getuserdata();
    }, [])
    

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
                                    <button key={index} onClick={()=>SetSelectFriend(i)} className='w-[90%] rounded-[5px] cursor-pointer hover:scale-[1.03] transition-all  bg-gray-800 text-[2rem] text-start px-[1rem] ' >👤{i}</button>
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
                                <div className='w-full  h-[100%] ' ></div>
                                <form className='w-full' >
                                    <input type="text" className='w-[90%] p-[0.4rem] bg-white font-semibold text-[1.5rem] text-black ' />
                                    <button className='w-[10%] bg-gray-900 p-[0.4rem] !text-[1.5rem] cursor-pointer ' >
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