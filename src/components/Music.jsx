import { useState, useEffect } from "react"
import guitarMusic from "../assets/guitar-music.mp3" // Source: https://pixabay.com/

export default function Music(props) {
    const [music, setMusic] = useState(new Audio(guitarMusic));
    music.loop = true;

    useEffect(() => {
        music.pause();
        if (props.isMusicOn) {
          music.play();
        }
      }, [props.isMusicOn])

}