import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-regular-svg-icons'
import Icon from "./Icon"

export default function GiveUp(props) {
    const [active, setActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const content = (
        <div>
            <h3>Do you really want to give up?</h3>
            <div>
                <button className="button-menu button-primary" onClick={() => {toggle(); props.reveal(); setIsDisabled(true)}}>Yes</button>
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
            isDisabled={isDisabled}
            buttonContent={<FontAwesomeIcon icon={faFlag} size="2x" />}
            buttonText="resign"
            heading="give up"    
            mainContent={content}
        />
    )
}