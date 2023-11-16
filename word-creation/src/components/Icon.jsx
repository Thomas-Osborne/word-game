import Modal from "./Modal"

export default function Icon(props) {
    return (
        <div className="icon-container">
            <button 
                className="button-icon"
                onClick={props.toggle}
                disabled={props.isDisabled}>
                {props.buttonContent}
            </button>
            <p className="icon-text">{props.buttonText}</p>
            <Modal 
                modal={props.active}
                toggle={props.toggle}
                heading={props.heading}
                content={props.mainContent}
            />
        </div>
    )
}