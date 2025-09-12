export default function Letter(props) {

    function determineColour() {
        if (props.revealed & !(props.found)) {
            return {color: 'red'}
        } else {
            return {color: 'black'}
        }
    }

    return (
        <span className="letter inline-block" style={determineColour()}>{props.revealed ? props.letter : "?"}</span>
    )
}