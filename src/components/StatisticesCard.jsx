export default function StatisticesCard({title,value}){
    return(
        <div className="textcolre dark:bg-[#2a2a2a] bg-[#e0e0e0] px-5 py3 sm:px-10 sm:py-6 rounded-md">
          <h1 className="font-bold text-xl">{title}</h1>
          <h2>{value}</h2>
        </div>
    )
}