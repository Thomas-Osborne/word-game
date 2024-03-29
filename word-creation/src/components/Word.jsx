import Letter from "./Letter"

export default function Word(props) {
    
    const letters = props.word.name.split("");
    const letterElts = letters.map((letter, index) => <Letter key={index} letter={letter} revealed={props.word.revealed} found={props.word.found}/>);

    return (
        <li className={props.containerType}>
            {letterElts}
        </li>
    )
}