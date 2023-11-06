import raw from "../../words_alpha.txt"

export default function App() {

  function extractData() {
    fetch(raw)
      .then(r => r.text())
      .then(text => {
      const textArray = text.split("\r\n").filter(reduceWords);
      const sortedArray = textArray.sort(sortWords);
      const sixLetterArray = textArray.filter(getSixLetterWords)
      console.log(sixLetterArray)
      const index = randomIndex(sixLetterArray.length);
      console.log(index);
      const objectArray = sortedArray.map(word => ({"word": word, "found": false}))
      console.log(objectArray);
      })
  }

    function reduceWords(word) {
      return (word.length >= 3 && word.length <= 6)
    }

    function getSixLetterWords(word) {
      return (word.length == 6)
    }

    function randomIndex(length) {
      const index = Math.floor(Math.random() * (length - 1));
      return index;
    }

    function sortWords(word1, word2) {
      return word2.length - word1.length || word1.localeCompare(word2);
    }

  extractData();

  return (
    <div>
      Hello
    </div>
  )
}
