export default function Letter(props) {
    return (
        <span className="letter">{props.found ? props.letter : "?"}</span>
    )
}