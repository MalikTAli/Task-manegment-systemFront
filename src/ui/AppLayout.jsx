import { Outlet } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import Header from "./Header";
import Navbar from "./Navbar";

export default function AppLayout(){
    return(
        <div className="textcolre w-[100%]  bg-white dark:bg-black flex flex-col min-h-screen">
            <ThemeToggle />
            <Header />
            <div className="flex min-h-screen dark:border-t-[#1e1e1e] border-t-[2px]">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}