/** Textual markov chain generator. */

class MarkovMachine {
  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns Map of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null]
   *  }
   *
   * */

  getChains() {
    let chainsObj = {};

    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i]
      let nextWord = (this.words[i+1] || null);

      if (chainsObj[currWord]) {
        chainsObj[currWord].push(nextWord);
      } else {
        chainsObj[currWord] = [nextWord];
      }
    }

    return chainsObj;

  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice. */

  getText() {
    // - start at the first word in the input text
    // - find a random word from the following-words of that
    // - repeat until reaching the terminal null

    let array = [];
    let currWord = this.words[0];

    while (currWord !== null) {
      array.push(currWord);
      let randomIdx = Math.floor(Math.random() * this.chains[currWord].length);
      currWord = this.chains[currWord][randomIdx];
    }

    return array.join(" ");

  }
}


module.exports = {
  MarkovMachine,
};

