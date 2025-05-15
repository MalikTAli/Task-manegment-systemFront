import { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import StatisticesCard from "../components/StatisticesCard";
import GeneralBarChart from "../components/GeneralBarChart";
import { getHomeInfo } from "../services/homeService";
import { useSelector } from "react-redux";

export default function HomePage() {
  const [generalData, setGeneralData] = useState([]);
  const token = useSelector((state) => state.auth.token); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHomeInfo(token);
        setGeneralData(data);
      } catch (error) {
        console.error("Error fetching home info:", error);
      }
    };

    fetchData();
  }, [token]);

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
