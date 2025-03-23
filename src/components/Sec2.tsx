
const Sec2 = () => {

    interface howtworddata {
        id: number;
        title: string;
        description: string;
    }

    const howItWorks: howtworddata[] = [
        {
          id: 1,
          title: "📸 Share Your Moments",
          description: "Capture and share your favorite moments with stunning photos and thoughtful captions. Let your personality shine through every post, and build a collection of memories that truly represent you!"
        },
        {
          id: 2,
          title: "🤝 Connect & Chat",
          description: "Find new friends, follow like-minded people, and engage in meaningful conversations. Whether you're discussing trends or just having fun, our real-time chat keeps you connected effortlessly!"
        },
        {
          id: 3,
          title: "❤️ Engage & Interact",
          description: "Like posts that inspire you, leave meaningful comments, and share your favorite content with your circle. Keep the chai talks flowing and be part of an engaging and lively community!"
        }
      ];
      
      
      
      
  return (
    <>
        <div className="my-[5rem]" >
            <h1 className="text-center text-[3rem] font-bold text-[#FF6F38]  " >How ChaiCircle Works</h1>
            <div className="mt-[3rem] flex flex-wrap gap-[3rem] justify-center   " >
                {
                    howItWorks.map((i, index) => (
                        <div key={index} className="bg-gray-900 w-[30%] p-[1rem] rounded-[5px] flex flex-col gap-[1rem] hover:scale-[1.02] tranistion-all cursor-pointer max-[800px]:w-[80%]  " >
                            <h2 className="text-[2rem]" >{i.title}</h2>
                            <p className="text-[1.3rem] text-justify " >{i.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default Sec2