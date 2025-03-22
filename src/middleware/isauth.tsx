import axios from 'axios';
export const isauth = async()=>{
   try {
    
    const {data}:any = await axios.get(`${import.meta.env.VITE_HOST}/isauth`,{
        withCredentials:true
    })


    if(data.user == false){
        localStorage.removeItem('token')
    }

    const ans:boolean = data.user;

    return ans;
    
   } catch (error) {
    return false;
   }
} 