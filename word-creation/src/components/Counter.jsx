export default function Counter(props) {
    return (
        <div className="inline-block score-container">
            <p className="score-text">{props.type.toUpperCase()}: <span className="score-number">{props.score}</span></p>
            <p className="score-latest-text"><span>+{props.latest}</span></p>
        </div>
    )
}