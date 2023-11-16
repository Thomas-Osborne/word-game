export default function Alert(props) {
    return (
        <div 
            className="alert-container" 
            style={{background: props.alert.error 
                ? 'linear-gradient(#D65144, #CB6A61)' 
                : 'linear-gradient(#417944, #7EB581)'}}>
            <p className="alert-text">{props.alert.message}</p>
        </div>
    )
}