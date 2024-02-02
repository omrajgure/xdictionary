import { useState } from "react";

function App() {
  const [searchWord, setSearchWord] = useState("");
  const [wordMeaning, setWordMeaning] = useState("");

  const findInDictionary = () => {
    // This is set on every function call to empty because
    // when match is found for one word and again when we search for match not found word
    // there is a chance that previous meaning might not get removed.
    setWordMeaning("");

    const dictionary = [
      {
        word: "React",
        meaning: "A JavaScript library for building user interfaces.",
      },
      { word: "Component", meaning: "A reusable building block in React." },
      { word: "State", meaning: "An object that stores data for a component." },
    ];

    const lowerCaseSearchWord = searchWord.toLowerCase();

    for (const entry of dictionary) {
      const lowerCaseDictionaryWord = entry.word.toLowerCase();

      if (lowerCaseSearchWord === lowerCaseDictionaryWord) {
        setWordMeaning(entry.meaning);
        return;
      }
    }

    // The issue in the code is related to the asynchronous nature of state updates
    // in React. When we set wordMeaning state using setWordMeaning(''),
    // it doesn't immediately update wordMeaning in the same function call.
    // Therefore, the subsequent check if (wordMeaning === '') might not reflect
    // the updated state.

    // To fix this, you can use the state updater function form of setWordMeaning
    // to make sure you are working with the latest state value.
    // Here's an updated version of your code:
    setWordMeaning((prevWordMeaning) => {
      // If the previous meaning is empty, set the "not found" message
      if (prevWordMeaning === "") {
        return "Word not found in the dictionary.";
      }
      // If the previous meaning is not empty, it means a match was found in a previous search
      // In this case, do not update the meaning to avoid clearing a valid result
      return prevWordMeaning;
    });
  };

  return (
    <div>
      <h1>Dictionary App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          findInDictionary();
        }}
      >
        <input
          type="text"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          placeholder="Search for a word..."
        />
        <button type="submit">Submit</button>
      </form>
      <h3 style={{ marginTop: "0px" }}>Definition:</h3>
      <p>{wordMeaning}</p>
    </div>
  );
}

export default App;
