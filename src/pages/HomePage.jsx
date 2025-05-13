import { useState } from "react";
import HomeHeader from "../components/HomeHeader";
import StatisticesCard from "../components/StatisticesCard";
import GeneralBarChart from "../components/GeneralBarChart";

export default function HomePage(){
  const [generalData, setGeneralData] = useState([
    { title: "Projects", count: 5 },
    { title: "Tasks", count: 10 },
    { title: "Students", count: 20 },
    { title: "Finished", count: 3 },
  ]);

  const CardsList = generalData.map((item, index) => (
    <StatisticesCard key={index} title={item.title} value={item.count} />
  ));

  return (
    <div className="dark:bg-[#1e1e1e] w-full p-4">
      <HomeHeader />
      <div className="flex flex-wrap justify-between gap-4 pt-[100px]">
        {CardsList}
      </div>
      <div className="p-6 text-white">
        <GeneralBarChart data={generalData} />
      </div>
    </div>
  );
}
