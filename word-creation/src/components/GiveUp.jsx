import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-regular-svg-icons'
import Modal from "./Modal"

export default function GiveUp(props) {
    const [active, setActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const content = (
        <div>
            <h3>Do you really want to give up?</h3>
            <div>
                <button className="button-menu" onClick={() => {toggle(); props.reveal(); setIsDisabled(true)}}>Yes</button>
                <button className="button-menu" onClick={toggle}>No</button>
            </div>
        </div>
    )
    
    function toggle() {
        setActive(prevActive => !prevActive);
    }

    return (
        <div className="icon-container">
            <button 
                className="button-icon"
                onClick={toggle}
                disabled={isDisabled}>
                <FontAwesomeIcon icon={faFlag} size="2x" />
            </button>
            <p className="icon-text">RESIGN</p>
            <Modal 
                modal={active}
                toggle={toggle}
                heading="GIVE UP?"
                content={content}
            />
        </div>
    )
}