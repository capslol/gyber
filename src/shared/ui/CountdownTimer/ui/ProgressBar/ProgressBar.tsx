'use client';
import cls from './ProgressBar.module.scss';
import { useEffect, useState } from "react";
import { Time } from "@/shared/types/types";

interface ProgressTimerProps {
    startDate: Time;
    endDate: Time;
    days: number;
    hours: number;
    minutes: number;
    isStopped: boolean;
}

const ProgressBar = ({ startDate, endDate, days, hours, minutes, isStopped }: ProgressTimerProps) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const calcWidth = () => {
            const start = new Date(startDate.year, startDate.month - 1, startDate.day, startDate.hour, startDate.minutes).getTime();
            const end = new Date(endDate.year, endDate.month - 1, endDate.day, endDate.hour, endDate.minutes).getTime();
            const totalDuration = end - start;

            const remainingDuration = (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
            const elapsedDuration = totalDuration - remainingDuration;

            const fastProgressEnd = 90; // Процент завершения для быстрой фазы
            const fastDuration = totalDuration * 0.7; // 70% от общего времени

            let percentage;
            if (elapsedDuration <= fastDuration) {
                // Фаза быстрой прогрессии (до 70%)
                percentage = (elapsedDuration / fastDuration) * fastProgressEnd;
            } else {
                // Фаза медленной прогрессии (от 70% до 100%)
                const remainingFastDuration = elapsedDuration - fastDuration;
                const slowDuration = totalDuration - fastDuration;
                percentage = fastProgressEnd + (remainingFastDuration / slowDuration) * (100 - fastProgressEnd);
            }

            setWidth(isStopped ? 100 : Math.min(100, percentage));
        };

        calcWidth();
    }, [startDate, endDate, days, hours, minutes, isStopped]);

    return (
        <div className={cls.container}>
            <div className={cls.progress} style={{ width: `${width}%` }} />
        </div>
    );
};

export default ProgressBar;
