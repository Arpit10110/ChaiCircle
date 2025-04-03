import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import axios from "axios"
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import Footer from "../components/Footer";

  
  interface postdatatye{
    comments:[],
    likes:string[],
    caption:string,
    username:string,
    imageurl:string,
    _id:string
  }
const Explore = () => {
    const [ISLoading, SetLoading] = useState(false);
    const [Post,SetPost] = useState([]);
    const [Isuser,SetIsuser] = useState(false);
    const [Adminusername,SetAdminusername]  = useState("")
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [Comentopen,SetComentopen] = useState(false);
    const [Allcoments,SetAllcoments] = useState([]);
    const [Addnewcomment,SetAddnewcomment] = useState("")
    const [Selectedpost,SetSelectedpost] = useState("")


    const getexploreposts = async () => {
        SetLoading(true);
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_HOST}/explore`,{withCredentials:true});
            if(data.success === true){
                SetPost(data.data);
                SetIsuser(true);
                SetAdminusername(data.adminusername);
                console.log(data.data);
            }else{
                SetIsuser(false);
            }
            SetLoading(false);
        } catch (error) {
            console.error(error);
            SetLoading(false);
        }
    }



      const addlike = async(postid:string)=>{
        try {
          setOpen(true)
           await axios.post(`${import.meta.env.VITE_HOST}/addlike`,{
            postid: postid,
            userid:Adminusername
          },{
            withCredentials:true
          })
          setOpen(false)
          setRefresh(!refresh);
        } catch (error) {
          setOpen(false)
          console.log(error)
        }
       }
    
       const removelike = async(postid:string)=>{
        try {
          setOpen(true)
          const {data} = await axios.post(`${import.meta.env.VITE_HOST}/removelike`,{
            postid: postid,
            userid:Adminusername
          },{
            withCredentials:true
          })
          console.log(data)
          setOpen(false)
          setRefresh(!refresh);
        } catch (error) {
          setOpen(false)
          console.log(error)
        }
       }

       const opencommentbox = (comment:[],id:string)=>{
        SetAllcoments(comment)
        SetComentopen(true)
        SetSelectedpost(id)
       }


        const addnewcomment = async(e:any)=>{
           e.preventDefault();
           try {
             const {data} = await axios.post(`${import.meta.env.VITE_HOST}/addcomment`,{
               postid: Selectedpost,
               userid:Adminusername,
               addcomment:Addnewcomment
             },{
               withCredentials:true
             })
             console.log(data)
              toast.success(data.message, {
                                 position: "top-right",
                                 autoClose: 5000,
                                 hideProgressBar: false,
                                 closeOnClick: false,
                                 pauseOnHover: true,
                                 draggable: true,
                                 progress: undefined,
                                 theme: "dark",
                                 });
             setRefresh(!refresh);
             SetAddnewcomment("")
             SetComentopen(false)
           } catch (error) {
             console.log(error)
           }
          }


     useEffect(() => {
        getexploreposts();
     }, [refresh])
     

  return (
   <>
   <Backdrop
               sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
               open={open}
             >
               <CircularProgress color="inherit" />
  </Backdrop>

    <Dialog fullWidth={true} onClose={()=>SetComentopen(false)} open={Comentopen}>
                    <div  className=' bg-gray-800  text-white flex flex-col' >
                      {
                        Allcoments.length>0?
                        <div  className="scroll h-[60vh] overflow-y-scroll bg-gray-700 flex flex-col gap-[1rem] px-[0.5rem] py-[2rem] " >
                            {
                              Allcoments.map((i:any,index:number)=>{
                                return(
                                  <div className="bg-gray-800 p-[0.5rem] text-[1.5rem] rounded-[5px] flex flex-col gap-[0.3rem] cursor-default " key={index}>
                                      <h2>👤{i.username}</h2>
                                      <p className="pl-[1rem]" >{i.comments}</p>
                                  </div>
                                )
                              })
                            }
                        </div>:
                         <div className="h-[60vh] bg-gray-800 flex justify-center items-center " >
                           <h2 className="text-[2rem] font-semibold" >0 Comments</h2>
                         </div>
                      }
                       
                        <form className="w-full " onSubmit={addnewcomment} >
                          <input type="text" value={Addnewcomment} onChange={(e)=>SetAddnewcomment(e.target.value)} className="w-[80%] bg-white text-black text-[1.5rem] font-semibold p-[0.3rem] " required/>
                          <button className="w-[20%] cursor-pointer bg-gray-900 text-[1.5rem] p-[0.3rem] " >Submit</button>
                        </form>
                    </div>
    </Dialog>

    <Navbar/>
    {
        ISLoading ?
        <Loading/>:
        <div  className="flex justify-center flex-wrap gap-[5rem] items-center mb-[10rem] mt-[3rem] min-h-[50vh] " >
            {
                Isuser?
                <>
                    {
                      Post.map((i:postdatatye,index:number)=>{
                        return(
                            <div key={index} className="bg-gray-900 flex flex-col gap-[0.5rem] p-[0.5rem]  w-[35%] max-[800px]:w-[50%] max-[800px]:gap-[2rem] max-[600px]:w-[80%] max-[450px]:w-[90%]  rounded-[5px] " >
                                <div className="border-b-[1px] pb-[5px] border-gray-500 flex justify-between items-center " >
                                  <h2 className="text-[1.5rem] font-semibold " > 👤 {i.username}</h2>
                                </div>
                                <div className=" w-full h-[50vh]  " >
                                  <img className="w-[100%] h-[50vh] object-contain  " src={i.imageurl} alt="Image" />
                                </div>
                                <div className="border-t-[1px] mt-[5px]  border-gray-500 flex flex-col gap-[0.5rem] " >
                                    <h1 className="text-[1.5rem] font-semibold " >{i.caption}</h1>
                                    <div className="flex w-full justify-around  bg-[#ffffff1a] py-[0.5rem] rounded-[5px] items-center  " >
                                      <div className="flex gap-[0.5rem] items-center  " >
                                        <h4 className="text-[1.7rem] font-semibold " >{Number(i.likes.length) }</h4>
                                        {
                                        i.likes.includes(Adminusername) ?
                                        <button  onClick={()=>removelike(i._id)} >
                                          <FavoriteIcon  className="!text-[2rem] text-red-600  !cursor-pointer hover:scale-[1.05] transition-all " />
                                        </button>:
                                        <button onClick={()=>addlike(i._id)}  >
                                          <FavoriteBorderIcon  className="!text-[2rem] !cursor-pointer hover:scale-[1.05] transition-all " />
                                        </button>
                                        }
                                      </div>
                                      <div className="flex gap-[0.5rem] items-center  " >
                                        <h4 className="text-[1.7rem] font-semibold " >{Number(i.comments.length) }</h4>
                                        <button onClick={()=>opencommentbox(i.comments,i._id)} >
                                         <ChatBubbleOutlineSharpIcon className="!text-[2rem] !cursor-pointer hover:scale-[1.05] transition-all " />
                                        </button>
                                      </div>
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
                <Link to={"/login"} className="text-[2rem] mt-[5rem] bg-blue-500 px-[1rem] py-[0.3rem] rounded-[5px] " >Login To Explore Posts</Link>
            }
        </div>
    }
    <Footer/>
       <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
   </>
  )
}

export default Explore