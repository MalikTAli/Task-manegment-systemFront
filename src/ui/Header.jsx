export default function Header(){
    return(
        <div className="textcolre bg-[#ffff] flex w-[100%] justify-end gap-5 p-5 dark:bg-[#1e1e1e] dark:border-b-[#333333] border-b-[2px]">
            <h1 className="font-bold text-2xl">admin malik</h1>
            <button className="buttonStyle dark:bg-[#f44336] dark:hover:bg-[#bd3c32] bg-[#e0e0e0] hover:bg-[#bebebe] text-[#f44336] dark:text-[#e0e0e0] ">log out</button>
        </div>
    )
}