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
    return sortedArray.includes(word);
  }

  function findAllWords(word) {
    let words = [];
    const subsets = getPowerSet(word);
    console.log("subsets", subsets);
    for (const subset of subsets) {
      const permutations = getPermutations(subset);
      console.log(permutations);
      for (const permutation of permutations) {
        if (isWord(permutation) && !(words.includes(permutation))) {
          words.push(permutation);
        }
      }
    }
    return words.sort(sortWords);
  }

  // const wordList = extractData();
  // console.log(wordList);
  // console.log("Object", objectArray);
  console.log(shuffleWord("abcdef"));
  console.log(findAllWords("abcdef"));
  const word = "abcdef";
  const allWords = findAllWords(word);
  const allWordElts = allWords.map(word => <p>{word}</p>)
  return (
    <div>
      <h1>{word}</h1>
      {allWordElts};
    </div>
  )
}
