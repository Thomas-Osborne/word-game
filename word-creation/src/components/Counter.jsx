export default function Counter(props) {
    return (
        <div className="inline-block score-container">
            <p className="score-text">{props.type.toUpperCase()}: {props.score}</p>
            <p className="score-latest-text">+{props.latest}</p>
        </div>
    )
}