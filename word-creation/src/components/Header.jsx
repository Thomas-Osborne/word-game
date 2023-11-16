import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Header(props) {
    return (
        <header className="header">
            <h2 className="header-title">{props.title}</h2>
            <div className = "main--buttons">
                    <a href="https://github.com/Thomas-Osborne" target="_blank">
                        <button className="button-icon"><FontAwesomeIcon icon={faGithub} size="2x" /></button>
                    </a>
                    <a href="https://www.linkedin.com/in/tom-osborne-716619288/" target="_blank">
                        <button className="button-icon"><FontAwesomeIcon icon={faLinkedin} size="2x" /></button>
                    </a>
            </div>
        </header>
    )
}