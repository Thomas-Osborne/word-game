import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-regular-svg-icons'
import Icon from "./Icon"

export default function GiveUp(props) {
    const [active, setActive] = useState(false);

    const content = (
        <div>
            <h3>Do you really want to give up?</h3>
            <div>
                <button className="button-menu button-primary" disabled={props.isRevealed} onClick={() => {toggle(); props.reveal()}}>Yes</button>
                <button className="button-menu button-secondary" onClick={toggle}>No</button>
            </div>
        </div>
    )
    
    function toggle() {
        setActive(prevActive => !prevActive);
    }

    return (
        <Icon 
            toggle={toggle}
            active={active}
            isDisabled={props.isRevealed}
            buttonContent={<FontAwesomeIcon icon={faFlag} size="2x" />}
            buttonText="resign"
            heading="give up"    
            mainContent={content}
        />
    )
}