import raw from "../../words_alpha.txt"
import {useState, useEffect} from "react"

export default function App() {

  const [textArray, setTextArray] = useState([]);
  const [sortedArray, setSortedArray] = useState([]);
  const [objectArray, setObjectArray] = useState([]);

  useEffect(() => {{
    fetch(raw)
      .then(r => r.text())
      .then(text => setTextArray(text.split("\r\n").filter(reduceWords)));
    }
    setSortedArray(textArray.sort(sortWords));
    setObjectArray(sortedArray.map(word => ({"word": word.toUpperCase(), "found": false, "length": word.length})))
  }, [])

  console.log(textArray);
  console.log(sortedArray);
  console.log(objectArray);

  function reduceWords(word) {
    return (word.length >= 3 && word.length <= 6)
  }

  function getNLetterWords(word, length) {
    return (word.length == length)
  }

  function randomIndex(length) {
    const index = Math.floor(Math.random() * (length - 1));
    return index;
  }

  function sortWords(word1, word2) {
    return word2.length - word1.length || word1.localeCompare(word2);
  }

  function shuffleWord(word) {
    word = word.split("");
    for (let i = word.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [word[i], word[j]] = [word[j], word[i]];
    }
    return word.join("");
  }

  function getPowerSet(word) {
    // Source: https://stackoverflow.com/questions/42773836/how-to-find-all-subsets-of-a-set-in-javascript-powerset-of-array
    word = word.split("");
    const subsets = [[]];
    for (const char of word) {
        const last = subsets.length-1;
        for (let i = 0; i <= last; i++) {
            let newSubset = [...subsets[i], char].join("");
            if (!(subsets.includes(newSubset))) {
              subsets.push(newSubset);
            }
        }
    }
    
    return subsets;
  }

  function getPermutations(word) {

  }

  // const wordList = extractData();
  // console.log(wordList);
  // console.log("Object", objectArray);
  console.log(shuffleWord("abcdef"))
  console.log(getPowerSet("abcdef"))
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}
