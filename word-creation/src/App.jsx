import raw from "../../words_alpha.txt"
import {useState} from "react"

export default function App() {

  function extractData() {
    fetch(raw)
      .then(r => r.text())
      .then(text => {
      const textArray = text.split("\r\n").filter(reduceWords);
      const sortedArray = textArray.sort(sortWords);
      const objectArray = sortedArray.map(word => ({"word": word.toUpperCase(), "found": false}))
      console.log(objectArray);
    })
  }

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
      return word.join();
    }

  extractData();
  // const wordList = extractData();
  // console.log(wordList);
  // console.log("Object", objectArray);
  console.log(shuffleWord("abcdef"))
  return (
    <div>
      <p>Hello</p>
    </div>
  )
}
