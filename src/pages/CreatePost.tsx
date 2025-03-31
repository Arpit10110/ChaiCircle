import { useState } from "react";
import Navbar from "../components/Navbar"
import axios from "axios";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
    const navigate = useNavigate();
    const [ImageUploaded,SetImageUploaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [Caption,SetCaption] = useState("");
    const [ImageUrl,SetImageUrl] = useState("");

    const handleImageChange = async(e: any) => {
        try {
            setOpen(true);
            let Image=e.target.files?.[0];
            let data = new FormData();
            data.append("file",Image);
            data.append("upload_preset","arsheb");
            data.append("cloud_name","dblybkghe");
            const res = await axios.post("https://api.cloudinary.com/v1_1/dblybkghe/image/upload",data)
            const imageurl = res.data.secure_url;
            setOpen(false);
            SetImageUrl(imageurl)
            SetImageUploaded(true);
          } catch (error) {
            setOpen(false);
          }
    };

    const submitpost = async(e:any)=>{
        try {
            setOpen(true);
            e.preventDefault();
            const {data} =await axios.post(`${import.meta.env.VITE_HOST}/createpost`,{
                caption:Caption,
                imageurl:ImageUrl
            },{withCredentials:true})
            navigate(`/${data.profile}`);
            setOpen(false);
        } catch (error) {
            console.log(error)
            setOpen(false);
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
            <Navbar />
            <div className="flex justify-center" >
                <form onSubmit={submitpost} className="bg-gray-700 w-[50%] max-[800px]:w-[95%]  p-[1rem] rounded-[10px] mt-[5rem] flex flex-col gap-[1rem]" action="">
                    <div className="flex flex-col gap-[0.5rem]" >
                        <h2 className="text-[1.5rem] font-semibold " >Caption</h2>
                        <textarea
                            value={Caption}
                            onChange={(e)=>SetCaption(e.target.value)}
                            className="bg-white w-full min-h-[15vh] rounded-[5px] text-black font-bold p-[0.4rem] text-[1.5rem]"
                            required
                        ></textarea>
                    </div>
                    <div className="flex font-semibold items-center bg-gray-800 w-full p-[0.4rem] rounded-[5px]  gap-[1rem]  ">
                        {
                            ImageUploaded?
                            <label className=" cursor-pointer text-[1.5rem] bg-green-700 text-white py-2 px-4 rounded-md text-center">
                                Image Uploaded
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>:
                            <label className=" cursor-pointer text-[1.5rem] bg-gray-900 text-white py-2 px-4 rounded-md text-center">
                                Upload Image
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        }
                    </div>
                    <button className="px-[2rem] py-[0.3rem] bg-[#f3771e] w-fit text-[1.3rem] font-bold rounded-[5px] m-auto cursor-pointer " >Create Post</button>
                </form>
            </div>
        </>
    )
}

export default CreatePost