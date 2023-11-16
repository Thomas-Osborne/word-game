import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import Modal from "./Modal"

export default function Instructions(props) {
    const [active, setActive] = useState(true);

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
        <div className="icon-container">
            <button className="button-icon" onClick={toggle}>
                <FontAwesomeIcon icon={faBookOpen} size="2x" />
            </button>
            <p className="icon-text">HOW</p>
            <Modal 
                modal={active}
                toggle={toggle}
                heading="How to Play"
                content={content}
            />
        </div>
    )
}