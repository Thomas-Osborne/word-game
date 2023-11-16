import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import Icon from "./Icon"

export default function Replay(props) {
    const [active, setActive] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const content = (
        <div>
            <h3>Do you really want to restart?</h3>
            <div>
                <button className="button-menu button-primary" onClick={() => {toggle(); props.restart()}}>Yes</button>
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
            buttonContent={<FontAwesomeIcon icon={faRotateRight} size="2x" />}
            buttonText="restart"
            heading="try again?"    
            mainContent={content}
        />
    )
}