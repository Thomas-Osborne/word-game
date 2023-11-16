import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import Icon from "./Icon"

export default function Instructions(props) {
    const [active, setActive] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    const content = (
        <div>
            <h3>Welcome to the Word Game!</h3>
            <p>There are 6 letters for you to play with, you need to make as many words out of them as possible. You can give up and reveal the words, but then you will not be able to play!</p>
            <h4>Scoring</h4>
            <p>If you get a {props.max} letter word you score {2 * props.max} points. Otherwise you score as many points as the number of letters.</p>
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