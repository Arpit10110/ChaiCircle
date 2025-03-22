import Img1 from "../assets/sec3img1.jpeg"
import Img2 from "../assets/sec3img2.jpeg"
const Sec3 = () => {
  return (
    <>
        <div className="my-[8rem] px-[2rem] " >
            <div className="flex flex-wrap justify-around  items-center  " >
                <div className="w-[50%] flex flex-col gap-[1rem] " >
                    <h1 className="text-[3rem] font-bold " > Discover & Explore 🌍</h1>
                    <p className="w-full text-[1.5rem] " >
                    Dive into a world of exciting content! Follow interesting people, explore trending posts, and stay updated with what’s happening in your circle. Whether it's a fun chai break or a deep conversation, your feed stays fresh and engaging!
                    </p>
                </div>
                <div className="w-[30%] ">
                    <img className="w-[100%] rounded-[10px] shadow-[0px_0px_48px_-6px_#ff24e1b3] " src={Img1} alt="Img1" />
                </div>
            </div>
            <div className="flex flex-wrap justify-around  items-center mt-[8rem] flex-row-reverse  " >
                <div className="w-[50%] flex flex-col gap-[1rem] " >
                    <h1 className="text-[3rem] font-bold " >Secure & Private 🔒</h1>
                    <p className="w-full text-[1.5rem] " >
                    Your privacy matters! We provide a safe space where you control what you share. Connect with confidence, knowing that your conversations, posts, and interactions are protected, so you can focus on building meaningful connections.
                    </p>
                </div>
                <div className="w-[30%]">
                    <img className="w-[100%] rounded-[10px] shadow-[0px_0px_48px_-6px_#24d4ff8f] " src={Img2} alt="Img1" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Sec3