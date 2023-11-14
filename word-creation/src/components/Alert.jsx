export default function Alert(props) {
    return (
        <div className="alert-container" style={{borderColor: props.alert.error ? 'red' : 'green'}}>
            <p className="alert-text">{props.alert.message}</p>
        </div>
    )
}