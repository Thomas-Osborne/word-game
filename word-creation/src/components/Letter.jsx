export default function Letter(props) {
    return (
        <span className="letter inline-block">{props.revealed ? props.letter : "?"}</span>
    )
}