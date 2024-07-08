"use client"
import cls from "./LaunchPad.module.scss";
import LogoGemPad from "./LogoGempad";

import {useState} from "react";
import {Button, ThemeButton} from "@/shared/ui/Button/Button";
import {CountdownProgressTimer} from "@/shared/ui/CountdownTimer";
import {Time} from "@/shared/types/types";

const TIMER_IS_ACTIVE = false;



const startDate = {
    year: 2024,
    month: 7,
    day: 5,
    hour: 0,
    minutes: 0
} as const;

const endDate = {
    year: 2024,
    month: 9,
    day: 30,
    hour: 22,
    minutes: 0
} as const;



const formatDate = (time: Time): string => {
    const padZero = (num: number) => (num < 10 ? '0' + num : num.toString());
    const day = padZero(time.day);
    const month = padZero(time.month);
    const year = time.year.toString();


    return `${day}.${month}.${year}`;
};

const formattedStartDate = formatDate(startDate);
const formattedEndDate = formatDate(endDate);

const LaunchPad = () => {
    const [timerIsStopped, setTimerIsStopped] = useState(false);
    const handleClick = () => {
        window.open("https://discord.gg/amzvJ7UTsz", "_blank")
    }
    return (
        <div className={cls.bgWrapper}>
            <h2>Launch Pad</h2>
            <h3>For the first time, the GBR token will be offered to a wide range of investors through the Launch Pad platforms.</h3>
            <div className={cls.timeCard}>
                <LogoGemPad />
                <CountdownProgressTimer
                    startDate={startDate}
                    endDate={endDate}
                    year={endDate.year}
                    month={endDate.month}
                    day={endDate.day}
                    hour={endDate.hour}
                    minutes={endDate.minutes}
                    isActive={TIMER_IS_ACTIVE}
                    isStopped={() => setTimerIsStopped(true)}
                />
                <div className={cls.infoWrapper}>
                    <div className={cls.infoLeft}>
                        <h4>Quantity: 9T Gbr</h4>
                        <p>Start date: {formattedStartDate}</p>
                    </div>
                    <div className={cls.separator}></div>
                    <div className={cls.infoRight}>
                        <h4>Price: 0.00002286 <span>BNB</span></h4>
                        <p>End date: {formattedEndDate}</p>
                    </div>
                </div>
                <div className={cls.buttonWrapper}>
                    <Button onClick={handleClick} theme={ThemeButton.FIRE} disabled={!timerIsStopped && !TIMER_IS_ACTIVE}>
                        Join
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default LaunchPad;