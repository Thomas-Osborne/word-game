import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import Modal from "./Modal"

export default function Instructions() {
    const [active, setActive] = useState(true);

    function toggle() {
        setActive(prevActive => !prevActive);
    }

    return (
        <div className="instructions-container">
            <button className="button-icon button-instructions">
                <FontAwesomeIcon icon={faBookOpen} size="2x" />
            </button>
            <p className="instructions-text">HOW</p>
            <Modal 
                modal={active}
                toggle={toggle}
                heading="How to Play"
            />
        </div>
    )
}