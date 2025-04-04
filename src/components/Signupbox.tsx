import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
const Signupbox = () => {
    const navigate = useNavigate();
    const [UserNameIn, SetUserNameIn] = useState<string>('');
    const [NameIn, SetNameIn] = useState<string>('');
    const [EmailIn, SetEmailIn] = useState<string>('');
    const [PasswordIn, SetPasswordIn] = useState<string>('');
    const [open, setOpen] = useState(false);


    const submit = async(e:any)=>{
        setOpen(true);
        e.preventDefault();
        try {
            const userdata = {
                username:UserNameIn.trim(),
                name:NameIn.trim(),
                email:EmailIn.trim(),
                password:PasswordIn.trim()
            }
            const {data} = await axios.post(`${import.meta.env.VITE_HOST}/signup`,userdata,{
                withCredentials: true
            })
            if(data.success == true){
                navigate('/login');
                setOpen(false);
            }else{
                toast.warn(data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
        } catch (error) {
            console.error(error);
        }
    }


  return (
    <>
     <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

        <div className='flex justify-center cursor-default  ' >
            <form onSubmit={submit} className='mt-[5rem] bg-gray-800 w-[50%] max-[800px]:w-[95%]  p-[1rem] rounded-[5px] flex flex-col gap-[1rem] ' >
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >UserName</h3>
                    <input  className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' type="text" value={UserNameIn} onChange={(e) => SetUserNameIn(e.target.value.trimStart())}   required/>
                </div>
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >Name</h3>
                    <input className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' type="text" value={NameIn} onChange={(e) => SetNameIn(e.target.value)}   required/>
                </div>
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >Email</h3>
                    <input className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' type="text" value={EmailIn} onChange={(e) => SetEmailIn(e.target.value.trimStart())}   required/>
                </div>
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >Password</h3>
                    <input type='password' className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' value={PasswordIn} onChange={(e) => SetPasswordIn(e.target.value.trimStart())} required />
                </div>
                <div className='flex justify-center items-center flex-col gap-[5px]' >
                    <button className='text-[1.5rem] bg-blue-600 font-semibold px-[1rem] py-[0.3rem] rounded-[5px] hover:scale-[1.02] transition-all cursor-pointer  ' >SignUP</button>
                    <h2 className='text-[1.4rem] font-semibold  ' >Already have account..<Link to={"/login"} className='text-blue-400'  >Login</Link></h2>
                </div>
            </form>
        </div>
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

export default Signupbox