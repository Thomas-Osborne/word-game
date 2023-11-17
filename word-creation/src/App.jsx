import { sortedWords } from "./sorted-words"
import { commonSixLetters } from "./components/common-six-letter"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCirclePause, faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons'

//Source: https://pixabay.com/
import correctSound from "./assets/correct-answer.mp3"
import incorrectSound from "./assets/incorrect-answer.mp3"

import Music from "./components/Music"
import Header from "./components/Header"
import Timer from "./components/Timer"
import Icon from "./components/Icon"
import Instructions from "./components/Instructions"
import GiveUp from "./components/GiveUp"
import Replay from "./components/Replay"
import Counter from "./components/Counter"
import Word from "./components/Word"
import Alert from "./components/Alert"

export default function App() {
  const MAX_LENGTH = 6;

  const [chosenWord, setChosenWord] = useState({actual: "", shuffled: ""});

  const [filteredWords, setFilteredWords] = useState([]);
  const filteredWordsElts = filteredWords.map((word, index) => <Word word={word} key={index}/>);

  const [inputtedWord, setInputtedWord] = useState("");

  const [score, setScore] = useState({points: 0, totalFound: 0});
  const [increase, setIncrease] = useState({points: 0, totalFound: 0});
  
  const [alert, setAlert] = useState({message: "", error: true});

  const [isRevealed, setIsRevealed] = useState(false);

  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const [timer, setTimer] = useState("03:00")

  useEffect(() => {
    getRandomWord();
  }, []);

  useEffect(() => {
    setFilteredWords(findAllWords(chosenWord.actual));
    setScore({points: 0, totalFound: 0});
    setIncrease({points: 0, totalFound: 0});
    setAlert({message: "Please enter a word.", error: true})
    setIsRevealed(false);
    setTimer("03:00");
  }, [chosenWord])

  useEffect(() => {
    if (isRevealed) {
      setFilteredWords(prevFilteredWords => (prevFilteredWords.map(word => ({...word, revealed: true}))));
      setAlert({message: "Thanks for playing!", error: false});
    }
  }, [isRevealed])

  useEffect(() => {
    if (timer === "00:00") {
      setIsRevealed(true);
    }
  }, [timer])

  function getRandomWord() {
    const index = randomIndex(commonSixLetters.length);
    const newWord = commonSixLetters[index];
    setChosenWord({actual: newWord, shuffled: shuffleWord(newWord)});
  }

  function randomIndex(length) {
    const index = Math.floor(Math.random() * (length - 1));
    return index;
  }

  function sortWords(word1, word2) {
    return word2.length - word1.length || word1.localeCompare(word2);
  }

  function shuffleWord(word) {
    const permutations = getPermutations(word);
    const index = randomIndex(permutations.length);
    return permutations[index];
  }

  function getPowerSet(word) {
    // Source: https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array
    word = word.split("");
    const subsets = [""];
    for (const char of word) {
        const last = subsets.length-1;
        for (let i = 0; i <= last; i++) {
            let newSubset = [...subsets[i], char].join("");
            if (!(subsets.includes(newSubset))) {
              subsets.push(newSubset);
            }
        }
    }
    return subsets.sort(sortWords);
  }

  function getPermutations(word) {
    // Source: https://stackoverflow.com/questions/9960908/permutations-in-javascript
    word = word.split("");
    let length = word.length,
    c = new Array(length).fill(0),
    permutations = [word.join("").slice()],
    i = 1, k, p;

    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = word[i];
        word[i] = word[k];
        word[k] = p;
        c[i]++;
        i = 1;
        permutations.push(word.slice().join(""));
      } else {
        c[i] = 0;
        i++;
      }
    }
    return permutations.sort(sortWords);
  }

  function isWord(word, wordList) {
    return wordList.map(word => word.name).includes(word);
  }

  function findAllWords(word) {
    let words = [];
    const subsets = getPowerSet(word);
    for (const subset of subsets) {
      const permutations = getPermutations(subset);
      for (const permutation of permutations) {
        if (isWord(permutation, sortedWords) && !(words.includes(permutation))) {
          words.push(permutation);
        }
      }
    }
    return words.sort(sortWords).map(word => ({"name": word, "revealed": false, "found": false}));
  }

  function handleChange(event) {
    setInputtedWord(event.target.value);
  }

  function checkWord(event) {
    console.log("filtered words", filteredWords);
    const capitalisedWord = inputtedWord.replace(/[^a-zA-Z]/g,'').toUpperCase();
    let sound = incorrectSound;
    if (capitalisedWord.length == 0) {
      setAlert({message: "Please enter a word.", error: true})
    } else if (capitalisedWord.length < 3) {
      setAlert({message: `The word ${truncateWord(capitalisedWord)} is too short.`, error: true});
    } else if (capitalisedWord.length > 6) {
      setAlert({message: `The word ${truncateWord(capitalisedWord)} is too long.`, error: true});
    } else if (!isWord(capitalisedWord, sortedWords)) {
      setAlert({message: `The word ${truncateWord(capitalisedWord)} is not a word.`, error: true});
    } else if (!isWord(capitalisedWord, filteredWords)){
      setAlert({message: `The word ${truncateWord(capitalisedWord)} is not on the board.`, error: true});
    } else {
      const word = filteredWords.find(word => word.name === capitalisedWord);
      if (word.found) {
        setAlert({message: `The word ${truncateWord(capitalisedWord)} has already been found.`, error: true})
      } else {
        setAlert({message: `The word ${truncateWord(capitalisedWord)} is on the board!`, error: false});
        setFilteredWords(prevFilteredWords => (
          prevFilteredWords.map(word => (
            word.name === capitalisedWord ? {...word, revealed: true, found: true} : word
          ))
        )); 
        sound = correctSound;
        applyScore(capitalisedWord.length);
      }
    }
    playSound(sound);
    setInputtedWord("");
  }

  function truncateWord(word) {
    const maxChars = 12;
    if (word.length <= maxChars) {
      return word;
    } else {
      return word.slice(0, maxChars) + "..."
    }
  }

  function playSound(sound) {
    if (isSoundOn) {
      new Audio(sound).play();
    }
  }

  function applyScore(length) {
    let increase;
    if (length === MAX_LENGTH) {
      increase = 2 * length; // double points for max length word
    } else {
      increase = length;
    }
    setScore(prevScore => ({
      points: prevScore.points + increase,
      totalFound: prevScore.totalFound + 1
    }))
    setIncrease({points: increase, totalFound: 1})
  }

  return (
    <div className="app">
      <Music isMusicOn={isMusicOn}/>
      <Header title="Word Game"/>
      <main>
        <div className="container">
          <Timer timer={timer} setTimer={setTimer} isRevealed={isRevealed}/>
          <div className="menu-container">
            <Instructions max={MAX_LENGTH} className="inline-block" />
            <Replay restart={getRandomWord} className="inline-block" />
            <GiveUp isRevealed={isRevealed} reveal={() => setIsRevealed(true)} className="inline-block" />
            <Icon
              toggle={() => setIsMusicOn(prevIsMusicOn => !prevIsMusicOn)}
              isDisabled={false}
              buttonContent={isMusicOn ? <FontAwesomeIcon icon={faCirclePause} size="2x" /> : <FontAwesomeIcon icon={faCirclePlay} size="2x" /> }
              buttonText="music"
              active={false} 
            />
            <Icon
              toggle={() => setIsSoundOn(prevIsSoundOn => !prevIsSoundOn)}
              isDisabled={false}
              buttonContent={isSoundOn ? <FontAwesomeIcon icon={faVolumeHigh} size="2x" /> : <FontAwesomeIcon icon={faVolumeXmark} size="2x" /> }
              buttonText={"sfx"}
              active={false} 
            />
          </div>
          <div className="score-container">
            <Counter type="score" score={score.points} latest={increase.points}/>
            <Counter type="words found" score={score.totalFound} latest={increase.totalFound}/>
          </div>
          <Alert alert={alert}/>
          <div className="guess-elements">
            <input
              className="input-guess"
              type="text" 
              placeholder={isRevealed ? "" : "Enter a word..."} 
              name="inputtedWord" 
              value={inputtedWord} 
              onChange={handleChange}
              onKeyDown={
                (event) => {
                  if (event.key === "Enter") {
                    checkWord();
                  }
                }
              }
              disabled={isRevealed}
            />
            <button 
              className="button-menu submit-guess button-primary"
              onClick={checkWord}
              disabled={isRevealed}>Submit</button>
          </div>
          <h1 className="chosen-word">{chosenWord.shuffled}</h1>
          <div className="word-wrapper">  
            <ul className="word-list unbulleted-list">
              {filteredWordsElts}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
