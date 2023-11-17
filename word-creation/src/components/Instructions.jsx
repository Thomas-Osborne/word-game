import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import Icon from "./Icon"
import Word from "./Word"

export default function Instructions(props) {
    const [active, setActive] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    const content = (
        <div>
            <ul className="unbulleted-list">
                <Word containerType="word-container word-special" word={{name: "RULES", found: true, revealed: true}} />
            </ul>
            <p className="rules-text">Make as many words from the {props.max} letters as possible. You get points for each word you can find. If the time runs out then you can no longer enter words!</p>

            <ul className="unbulleted-list">
                <Word containerType="word-container word-regular" word={{name: "SCORE", found: true, revealed: true}} />
            </ul>
            <p className="rules-text">If you get a {props.max} letter word you score {2 * props.max} points. Otherwise you score as many points as the number of letters the word has.</p>
            <button className="button-menu button-primary" onClick={toggle}>Okay!</button>
        </div>
    )
    
    function toggle() {
        setActive(prevActive => !prevActive);
    }

    return (
        <Icon 
            toggle={toggle}
            active={active}
            isDisabled={isDisabled}
            buttonContent={<FontAwesomeIcon icon={faBookOpen} size="2x" />}
            buttonText="how"
            heading="how to play"    
            mainContent={content}
        />
    )
}