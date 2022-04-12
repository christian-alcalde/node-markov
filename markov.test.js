"use strict";

const { MarkovMachine } = require("./markov");

describe("getChains functions", function () {

  test("getChains function returns map of Markov chains without branches", function () {
    let markovMachine = new MarkovMachine("The cat in the hat.");
    let chains = markovMachine.chains;
    let expectedChain = {
      The: ["cat"],
      cat: ["in"],
      in: ["the"],
      the: ["hat."],
      "hat.": [null]
    };
    expect(chains).toEqual(expectedChain);
  });

  test("getChains function returns map of Markov chains with branches", function () {
    let markovMachine = new MarkovMachine("The cat is in the hat. The cat is the cat. The hat is a cat.");
    let chains = markovMachine.chains;
    let expectedChain = {
      The: ['cat', 'cat', 'hat'],
      cat: ['is', 'is'],
      is: ['in', 'the', 'a'],
      in: ['the'],
      the: ['hat.', 'cat.'],
      'hat.': ['The'],
      'cat.': ['The', null],
      hat: ['is'],
      a: ['cat.']
    };
    expect(chains).toEqual(expectedChain);
  });
});


describe("getText functions", function () {

  test("getText function returns random text from chains", function () {
    let markovMachine = new MarkovMachine("The the the.");
    let text = markovMachine.getText();
    let expectedText = "The the the.";

    expect(text).toEqual(expectedText);
  });

  test("getText function returns random text from chains", function () {
    let markovMachine = new MarkovMachine("The cat in the hat.");
    let text = markovMachine.getText();
    let expectedText = "The cat in the hat.";

    expect(text).toEqual(expectedText);
  });
});