import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

// Based on https://www.youtube.com/watch?v=9DwGahSqcEc
export default function Modal(props) {

    return (
        <div>
            {props.modal && (
            <div className="modal">
                <div className="overlay">
                    <div className="modal-content">
                        <h1 className="modal-heading">{props.heading}</h1>
                        {props.content}
                        <button 
                            className="button-icon close-modal" 
                            onClick={props.toggle}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}