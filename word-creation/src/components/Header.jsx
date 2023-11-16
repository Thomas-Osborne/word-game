import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Header(props) {
    return (
        <header className="header">
            <ul className="icon-list unbulleted-list">
                <li className="icon-item">
                    <a href="https://github.com/Thomas-Osborne" target="_blank">
                        <button className="button-icon"><FontAwesomeIcon icon={faGithub} size="2x" /></button>
                    </a>
                </li>
                <li className="icon-item">
                    <a href="https://www.linkedin.com/in/tom-osborne-716619288/" target="_blank">
                        <button className="button-icon"><FontAwesomeIcon icon={faLinkedin} size="2x" /></button>
                    </a>
                </li>
                <li className="icon-item">
                    <a href="mailto: thomas.m.osborne.2@gmail.com" target="_blank">
                        <button className="button-icon"><FontAwesomeIcon icon={faEnvelope} size="2x" /></button>
                    </a>
                </li>
            </ul>
            <h2 className="header-title">{props.title}</h2>
        </header>
    )
}