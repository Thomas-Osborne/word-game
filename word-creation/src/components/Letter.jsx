export default function Letter(props) {
    return (
        <span className="letter inline-block">{props.found ? props.letter : "?"}</span>
    )
}