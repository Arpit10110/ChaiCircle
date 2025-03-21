import { useState } from 'react';
import { Link } from 'react-router-dom';
const Signupbox = () => {
    const [NameIn, SetNameIn] = useState<string>('');
    const [EmailIn, SetEmailIn] = useState<string>('');
    const [PasswordIn, SetPasswordIn] = useState<string>('');
  return (
    <>
        <div className='flex justify-center cursor-default  ' >
            <form action="" className='mt-[8rem] bg-gray-800 w-[40%] p-[1rem] rounded-[5px] flex flex-col gap-[1rem] ' >
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >Name</h3>
                    <input className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' type="text" value={NameIn} onChange={(e) => SetNameIn(e.target.value)}   required/>
                </div>
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >Email</h3>
                    <input className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' type="text" value={EmailIn} onChange={(e) => SetEmailIn(e.target.value)}   required/>
                </div>
                <div>
                    <h3 className='text-[1.5rem] font-semibold ' >Password</h3>
                    <input className='bg-white text-black w-full text-[1.3rem] font-semibold p-[0.3rem] rounded-[5px]  ' value={PasswordIn} onChange={(e) => SetPasswordIn(e.target.value)} required />
                </div>
                <div className='flex justify-center items-center flex-col gap-[5px]' >
                    <button className='text-[1.5rem] bg-blue-600 font-semibold px-[1rem] py-[0.3rem] rounded-[5px] hover:scale-[1.02] transition-all cursor-pointer  ' >SignUP</button>
                    <h2 className='text-[1.4rem] font-semibold  ' >Already have account..<Link to={"/login"} className='text-blue-400'  >Login</Link></h2>
                </div>
            </form>
        </div>
    </>
  )
}

export default Signupbox