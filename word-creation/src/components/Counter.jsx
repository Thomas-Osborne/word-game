export default function Counter(props) {
    return (
        <div className="inline-block">
            <p className="score-text">{props.type.toUpperCase()}: {props.score}</p>
            <p>+{props.latest}</p>
        </div>
    )
}