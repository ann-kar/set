import React, { useState, useEffect } from 'react';

import './Timer.scss';

function Timer() {

    const [centisecond, setCentisecond] = useState<string | number>('00');
    const [second, setSecond] = useState<string | number>('00');
    const [minute, setMinute] = useState<string | number>('00');
    const [isActive, setIsActive] = useState(false);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isActive) {
            intervalId = setInterval(() => {
                
                const centisecondCounter = (counter % 100);
                const secondCounter = Math.floor((counter / 60) % 60);
                const minuteCounter = Math.floor(counter / 3600);

                const computedCentisecond = String(centisecondCounter).length === 1 ? `0${centisecondCounter}` : centisecondCounter;
                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setCentisecond(computedCentisecond);
                setSecond(computedSecond);
                setMinute(computedMinute);
                setCounter(counter => counter + 1);

            }, 10)
        }

        return () => clearInterval(intervalId);
    }, [isActive, counter])

    return (
        <div className="Timer" onClick={() => setIsActive(!isActive)}>
            <div className="Timer__text">
                <span className="minute">{minute}</span>
                <span>:</span>
                <span className="second">{second}</span>
                 <span>:</span>
                <span className="centisecond">{centisecond}</span>
            </div>
       
        </div>
    );
}

export default Timer;
