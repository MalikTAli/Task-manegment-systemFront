import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";
export default function Welcome(){
    const navigate = useNavigate()
    return(
        <div className="w-[100%]  bg-white dark:bg-black flex flex-col min-h-screen">
            <ThemeToggle />
            <div className="textcolre mt-[10%] w-[50%] m-auto flex flex-col gap-20 items-centert bg-[#f8f8f8] dark:bg-[#1e1e1e] p-10 borderStyle min-h-[400px]">
                <h1 className="text-center font-semibold text-4xl">welcom to task manegment system</h1>
                <div className="flex justify-between">
                    <button className="bg-[#a5d6a7] hover:bg-[#4caf50] dark:bg-[#4caf50] dark:hover:bg-[#3f9242] buttonStyle" onClick={()=>{
                        navigate("/login")
                    }}>Log In</button>
                    <button className="bg-[#a5d6a7] hover:bg-[#4caf50] dark:bg-[#4caf50] dark:hover:bg-[#3f9242] buttonStyle" onClick={()=>{
                        navigate("/signup")
                    }}>Sign Up</button>
                </div>
            </div> 
            
        </div>
    )
}