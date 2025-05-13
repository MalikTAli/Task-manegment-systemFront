import { useState } from "react";
import Input from "../components/Input";
import ThemeToggle from "../ui/ThemeToggle";

export default function Login(){

    const [email, setEmail]= useState("")
    const [password, setPasswrod] = useState("")
    const [stayLogIn,setStayLogIn] = useState(false)

    function handelSetEmail(e){
        setEmail(e.target.value)
    }
    function handelSetPassword(e){
        setPasswrod(e.target.value)
    }

    function handelSubmit(e){
      e.preventDefault();

      alert(email + password+ stayLogIn)

    }
    return(
        <div className="w-[100%]  bg-white dark:bg-black flex flex-col min-h-screen" >
            <ThemeToggle />
            <div className="textcolre mt-[10%] w-[50%] m-auto flex flex-col gap-20 items-start bg-[#f8f8f8] dark:bg-[#1e1e1e] p-10 borderStyle min-h-[400px]">
                <h1 className="font-bold text-3xl">Sign In</h1>
                <form className="flex flex-col gap-5 w-[100%]" onSubmit={handelSubmit}>
                    <label className="lableStyle text-xl">
                        username
                        <Input type="email" Value={email} onChange={handelSetEmail}/>
                    </label>
                    <label className="lableStyle text-xl">
                        Password
                        <Input type="password" Value={password} onChange={handelSetPassword}  />
                    </label>
                    <label className="text-xl font-semibold">
                        <input type="checkbox" className="mr-1" checked={stayLogIn} onChange={(e)=>{
                            setStayLogIn(e.target.checked)
                        }}/>
                        Stay signed In
                    </label>
                    <button className="w-[100%] bg-[#a5d6a7] dark:bg-[#4caf50] hover:bg-[#40c844] buttonStyle"> Sign In</button>
                </form>
            </div>
        </div>
    )
}