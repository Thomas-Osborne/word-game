import Letter from "./Letter"

export default function Word(props) {
    
    const letters = props.word.name.split("");
    const letterElts = letters.map((letter, index) => <Letter key={index} letter={letter}/>);

    return (
        <div className="word-container">
            {letterElts}
        </div>
    )
}