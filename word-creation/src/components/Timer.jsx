import { useState, useEffect, useRef} from "react"

export default function Timer() {
    const [timer, setTimer] = useState("03:00")
    const ref = useRef(null);

    //Source: https://www.geeksforgeeks.org/how-to-create-a-countdown-timer-using-reactjs/
    function timeLeft(event) {
        const total = Date.parse(event) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        return {
            total, minutes, seconds
        };
    }

    function startTimer(event) {
        let { total, hours, minutes, seconds } = timeLeft(event);
        if (total >= 0) {
            setTimer(
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }

    function clearTimer(event) {
        setTimer('03:00');
 
        if (ref.current) clearInterval(ref.current);
        const id = setInterval(() => {
            startTimer(event);
        }, 1000)

        ref.current = id;
    }
 
    function getDeadTime(event) {
        let deadline = new Date();
 
        deadline.setSeconds(deadline.getSeconds() + 180);
        return deadline;
    }
 
    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);


    return (
        <div>
            <h2>{timer}</h2>
        </div>
    )
}