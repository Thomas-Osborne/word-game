export default function Alert(props) {
    return (
        <div className="alert-container">
            <p className="alert-text">{props.message}</p>
        </div>
    )
}