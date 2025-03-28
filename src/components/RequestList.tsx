import Dialog from '@mui/material/Dialog';
import axios from 'axios';
const RequestList = ({reqdata,openprop,onClose}:any) => {

    interface requsetdatatype{
        to:string,
        from:string
    }

   const open = openprop;
   const handleClose = () => {
    onClose();
  };


  const acceptreq = async(option:requsetdatatype)=>{
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_HOST}/acceptreq`,option,{withCredentials:true});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
  }


  const rejectreq = async(option:requsetdatatype)=>{
    try {
        const {data} = await axios.post(`${import.meta.env.VITE_HOST}/rejectreq`,option,{withCredentials:true});
        console.log(data);
    } catch (error) {
        console.log(error);
    }
  }


  return (
   <>
    <Dialog fullWidth={true} onClose={handleClose} open={open}>
        <div className='min-h-[50vh] bg-gray-800  text-white flex flex-col' >
            <div className='border-b-[1px] p-[0.4rem] ' >
                <h1 className='text-[1.5rem] font-bold text-gray-100 ' >Friends Request</h1>
            </div>
            <div>
                {
                    reqdata.length>0?
                    <div className='flex flex-col justify-center items-center gap-[2rem] mt-[2rem]  ' >
                        {
                            reqdata.map((i:requsetdatatype,index:number)=>{
                                return(
                                    <div key={index} className='flex bg-gray-700 p-[0.4rem] w-[95%] rounded-[5px] text-[1.5rem] justify-between px-[1rem]  items-center ' >
                                        <div>
                                            <h2 className='font-semibold' >{i.from}</h2>
                                        </div>
                                        <div className='flex gap-[1rem] ' >
                                            <button onClick={()=>acceptreq(i)} className='px-[1rem] py-[0.2rem] rounded-[5px] bg-green-500 cursor-pointer ' >Accept</button>
                                            <button onClick={()=>rejectreq(i)} className='px-[1rem] py-[0.2rem] rounded-[5px] bg-red-500 cursor-pointer ' >Reject</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>:
                    <div className='flex flex-col justify-center items-center  ' >
                        <h2 className='text-[1.5rem] font-semibold mt-[5rem]'>!!! No Freinds request !!!</h2>
                    </div>
                }
            </div>
        </div>
    </Dialog>
   </>
  )
}

export default RequestList