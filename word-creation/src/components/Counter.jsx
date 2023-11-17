import { useState, useEffect } from "react"

export default function Counter(props) {

    const [latestTextElt, setLatestTextElt] = useState(<p className="score-latest-text"></p>);

    useEffect(() => {
        //hacky solution to only show the score counter for proper scores and not the words found score counter
        if (props.latest > 1) {
            setLatestTextElt(<p className="score-latest-text go-up-and-fade" key={Math.random()}><span>+{props.latest}</span></p>);
        }
    }, [props.lastWord])

    return (
        <div className="inline-block score-container">
            <p className="score-text">{props.type.toUpperCase()}: <span className="score-number">{props.score}</span></p>
            {latestTextElt}
        </div>
    )
}