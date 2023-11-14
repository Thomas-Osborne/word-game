export default function Word(props) {
    return (
        <div className="word-container">
            <p className="available-words">{props.word}</p>
        </div>
    )
}