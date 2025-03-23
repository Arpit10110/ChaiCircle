
const Sec4 = () => {

    interface faqDatatype{
        id: number,
        question: string,
        answer: string,
    }

    const faqData: faqDatatype[] = [
        {
          id: 1,
          question: "🧐 What is ChaiCircle?",
          answer: "ChaiCircle is a social platform where you can share moments, make friends, chat live, and engage with posts through likes and comments."
        },
        {
          id: 2,
          question: "💰 Is ChaiCircle free to use?",
          answer: "Yes! ChaiCircle is completely free. You can explore posts, connect with people, and chat without any hidden fees or subscriptions."
        },
        {
          id: 3,
          question: "🔒 Is my data safe on ChaiCircle?",
          answer: "Yes! We prioritize security. Your messages are encrypted, and you have full control over your profile privacy and data settings."
        },
        {
          id: 4,
          question: "🛠 Can I delete my posts or account?",
          answer: "Yes, you can edit or delete posts anytime. If you ever wish to leave, you can delete your account, removing all your data."
        }
    ];
    
    
    
      

  return (
    <>
        <div className="my-[8rem]  " >
                <h1 className="text-[3rem] text-center font-bold text-[#FF6F38] "   >Frequently Asked Questions</h1>
                <div className="mt-[5rem] flex flex-wrap gap-[4rem] items-center justify-center " >
                    {
                        faqData.map((faq) => (
                            <div className="flex flex-col shadow-[0px_0px_48px_-6px_#ffffff40] max-[800px]:w-[80%]   gap-[1rem] w-[40%] p-[2rem] rounded-[5px] bg-gray-800 hover:scale-[1.02] transition-all cursor-pointer  " key={faq.id} >
                                <h3 className="text-[1.6rem] font-bold " >{faq.question}</h3>
                                <p className="text-[1.3rem] ">{faq.answer}</p>
                            </div>
                        ))
                    }
                </div>
        </div>
    </>
  )
}

export default Sec4