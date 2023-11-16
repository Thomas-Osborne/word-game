import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

export default function Instructions() {
    return (
        <div className="instructions-container">
            <button className="button-icon button-instructions">
            <FontAwesomeIcon icon={faBookOpen} size="2x" />
            </button>
            <p className="instructions-text">HOW</p>
        </div>
    )
}