import { useState, useEffect } from 'react';
import { formatDate } from '../utilites/formatDate';

export default function HomeHeader(){
    const [currentTime, setCurrentTime] = useState(formatDate(new Date()));

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentTime(formatDate(new Date()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return(
        <div className="flex w-[100%] justify-between flex-wrap gap-y-2">
            <h1 className="font-bold text-2xl text-[#027bff]" >Welcom To The Task Manegment System</h1>
            <h3>{currentTime}</h3>
        </div>
    )
}