import loader from "../assets/loader.gif"
const Loading = () => {
  return (
    <>
        <div className="h-[60vh] w-full flex justify-center items-center " >
            <img className="w-[12%]" src={loader} alt="Loading...." />
        </div>
    </>
  )
}

export default Loading