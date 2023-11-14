import {sortedWords} from "./sorted-words"
import {useState, useEffect} from "react"
import Word from "./Word"

export default function App() {
  const [chosenWord, setChosenWord] = useState("");
  useEffect(() => getRandomWord(), []);

  function getRandomWord() {
    const sixLetterWords = sortedWords.filter(word => word.name.length == 6);
    const index = randomIndex(sixLetterWords.length);
    setChosenWord(sixLetterWords[index].name);
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
    permutations = [word.slice()],
    c = new Array(length).fill(0),
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

  function isWord(word) {
    return sortedWords.map(word => word.name).includes(word);
  }

  function findAllWords(word) {
    let words = [];
    const subsets = getPowerSet(word);
    for (const subset of subsets) {
      const permutations = getPermutations(subset);
      for (const permutation of permutations) {
        if (isWord(permutation) && !(words.includes(permutation))) {
          words.push(permutation);
        }
      }
    }
    return words.sort(sortWords);
  }

  const allWords = findAllWords(chosenWord);
  const allWordsElts = allWords.map(word => <Word word={word} key={word}/>);

  return (
    <div>
      <header className="header">
        <h2 className="header-title">Word Game</h2>
      </header>
      <main>
        <div className="container">
          <button className="button-new-word" onClick = {getRandomWord}>Generate New Word</button>
          <h1 className="chosen-word">{shuffleWord(chosenWord)}</h1>
          {allWordsElts}
        </div>
      </main>
    </div>
  )
}
