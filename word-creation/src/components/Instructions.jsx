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
                <Word word={{name: "RULES", found: true, revealed: true}} />
            </ul>
            <p className="rules-text">There are 6 letters for you to play with, you need to make as many words out of them as possible. You can give up and reveal the words, but then you will not be able to play!</p>

            <ul className="unbulleted-list">
                <Word word={{name: "SCORE", found: true, revealed: true}} />
            </ul>
            <p className="rules-text">If you get a {props.max} letter word you score {2 * props.max} points. Otherwise you score as many points as the number of letters.</p>
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