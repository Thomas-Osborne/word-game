import {sortedWords} from "./sorted-words"
import {useState, useEffect} from "react"
import Word from "./components/Word"
import Alert from "./components/Alert"

export default function App() {
  const MAX_LENGTH = 6;

  const [chosenWord, setChosenWord] = useState({actual: "", shuffled: ""});

  const [filteredWords, setFilteredWords] = useState([]);
  const filteredWordsElts = filteredWords.map(word => <Word word={word} key={word}/>);

  const [inputtedWord, setInputtedWord] = useState("");

  const [score, setScore] = useState({points: 0, totalFound: 0});
  const [alert, setAlert] = useState({message: "", error: true});

  useEffect(() => {
    getRandomWord();
  }, []);

  useEffect(() => {
    setFilteredWords(findAllWords(chosenWord.actual));
    setScore({points: 0, totalFound: 0});
    setAlert({message: "Please enter a word.", error: true})
  }, [chosenWord])

  function getRandomWord() {
    const maxLengthWords = sortedWords.filter(word => word.name.length == MAX_LENGTH);
    const index = randomIndex(maxLengthWords.length);
    const newWord = maxLengthWords[index].name;
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
    return words.sort(sortWords).map(word => ({"name": word, "found": false}));
  }

  function handleChange(event) {
    console.log(event.target.value);
    setInputtedWord(event.target.value);
    console.log("inputted word", inputtedWord);
  }

  function checkWord(event) {
    console.log("filtered words", filteredWords);
    const capitalisedWord = inputtedWord.replace(/\s/g,'').toUpperCase();
    if (capitalisedWord.length == 0) {
      setAlert({message: "Please enter a word.", error: true})
    } else if (capitalisedWord.length < 3) {
      setAlert({message: `The word ${capitalisedWord} is too short.`, error: true});
    } else if (capitalisedWord.length > 6) {
      setAlert({message: `The word ${capitalisedWord} is too long.`, error: true});
    } else if (!isWord(capitalisedWord, sortedWords)) {
      setAlert({message: `The word ${capitalisedWord} is not a word.`, error: true});
    } else if (!isWord(capitalisedWord, filteredWords)){
      setAlert({message: `The word ${capitalisedWord} is not on the board.`, error: true});
    } else {
      const word = filteredWords.find(word => word.name === capitalisedWord);
      if (word.found) {
        setAlert({message: `The word ${capitalisedWord} has already been found.`, error: true})
      } else {
        setAlert({message: `The word ${capitalisedWord} is on the board!`, error: false});
        setFilteredWords(prevFilteredWords => (
          prevFilteredWords.map(word => (
            word.name === capitalisedWord ? {...word, found: true} : word
          ))
        )); 
        applyScore(capitalisedWord.length);
      }
    }
    setInputtedWord("");
  }

  function applyScore(length) {
    if (length === 6) {
      setScore(prevScore => ({
        points: prevScore.points + 2 * length, // double points for max length word
        totalFound: prevScore.totalFound + 1
      }));
    } else {
      setScore(prevScore => ({
        points: prevScore.points + length,
        totalFound: prevScore.totalFound + 1
      }));
    }
  }

  return (
    <div>
      <header className="header">
        <h2 className="header-title">Word Game</h2>
      </header>
      <main>
        <div className="container">
          <button className="button-new-word" onClick={getRandomWord}>Generate New Word</button>
          <div className="score-container">
            <p className="inline-block score-text">Score: {score.points}</p>
            <p className="inline-block score-text">Words Found: {score.totalFound}</p>
          </div>
          <Alert alert={alert}/>
          <div>
            <input 
              type="text" 
              placeholder="Enter a word..." 
              name="inputtedWord" 
              value={inputtedWord} 
              onChange={handleChange}
              onKeyDown={
                (e) => {
                  if (e.key === "Enter") {
                    checkWord();
                  }
                }
              }
            />
            <button onClick={checkWord}>Submit</button>
          </div>
          <h1 className="chosen-word">{chosenWord.shuffled}</h1>
          <div className="word-list">
            {filteredWordsElts}
          </div>
        </div>
      </main>
    </div>
  )
}
