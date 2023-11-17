import { useEffect, useRef} from "react"

export default function Timer(props) {
    const ref = useRef(null);

    useEffect(() => {

    }, [props.timer])

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
        let { total, minutes, seconds } = timeLeft(event);
        if (total >= 0) {
            props.setTimer(
                (minutes > 9 ? minutes : "0" + minutes) + ":"
                + (seconds > 9 ? seconds : "0" + seconds)
            )
        }
    }

    function clearTimer(event) {
        if (ref.current) {
            clearInterval(ref.current);
        }

        const id = setInterval(() => {
            if (!(props.isRevealed)) {
                startTimer(event);
            }
        }, 1000)

        ref.current = id;
    }
 
    function getTotalTime() {
        let total = new Date();
 
        total.setSeconds(total.getSeconds() + 0 * 3600 + 3 * 60 + 0 * 1);
        return total;
    }
 
    useEffect(() => {
        clearTimer(getTotalTime());
    }, [props.isRevealed, props.isRestarted]);
    

    return (
        <div>
            <h2>{props.timer}</h2>
        </div>
    )
}