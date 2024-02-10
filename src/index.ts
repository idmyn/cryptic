// https://github.com/niallmurphy-ie/Cryptic-Crossword-Companion
import abbreviationList from "./data/abbreviations.json";
import anagramWords from "./data/anagramWords.json";
import insertionWords from "./data/insertionWords.json";
import generalDeletionWords from "./data/generalDeletionWords.json";
import hiddenWords from "./data/hiddenWords.json";
import spoonerWords from "./data/spoonerWords.json";
import reverseWords from "./data/reversalWords.json";
import palindromeWords from "./data/palindromeWords.json";
import linkingWords from "./data/linkingWords.json";
import letterSwapWords from "./data/letterSwapWords.json";
import letterSelectionWords from "./data/letterSelectionWords.json";
import juxtapositionWords from "./data/juxtapositionWords.json";
import homophoneWords from "./data/homophoneWords.json";

const clueTypes = {
  anagram: anagramWords,
  insertion: insertionWords,
  deletion: generalDeletionWords,
  hidden: hiddenWords,
  spoon: spoonerWords,
  reversal: reverseWords,
  palindrome: palindromeWords,
  linking: linkingWords,
  "letter movement": letterSwapWords,
  "letter selection": letterSelectionWords,
  juxtaposition: juxtapositionWords,
  homophones: homophoneWords,
};

type ClueType = keyof typeof clueTypes;

type ClueData = {
  abbreviations: Array<{ phrase: string; abbreviations: string[] }>;
  indicators: Array<{ phrase: string; clueTypes: ClueType[] }>;
};

export function parseClue(clue: string): ClueData {
  const lowerCased = clue.toLowerCase();

  const abbreviations = findAbbreviations(lowerCased);
  const indicators = findIndicators(lowerCased);

  return { abbreviations, indicators };
}

type Indicator = { phrase: string; meaning: Array<string> };

function findMatches(clue: string, indicators: Indicator[]): Indicator[] {
  type Match = { index: number; phrase: string; meaning: string[] };
  const matches: Match[] = [];

  indicators.forEach(({ phrase, meaning }) => {
    const re = new RegExp(`\\W${phrase}\\W`);
    const match = re.exec(` ${clue} `);
    if (match) {
      matches.push({ index: match.index, phrase, meaning });
    }
  });

  matches.sort((a, b) => a.index - b.index);
  return matches.map(({ phrase, meaning }) => ({ phrase, meaning }));
}

export function findAbbreviations(clue: string): ClueData["abbreviations"] {
  const indicators: Indicator[] = Object.entries(abbreviationList).map(
    ([phrase, meaning]) => ({ phrase, meaning }),
  );

  const matches = findMatches(clue, indicators);

  return matches.map(({ phrase, meaning }) => ({
    phrase,
    abbreviations: meaning,
  }));
}

export function findIndicators(clue: string): ClueData["indicators"] {
  const map = Object.entries(clueTypes).reduce(
    (accumulator, [clueType, indicatorPhrases]) => {
      const indicators: Indicator[] = indicatorPhrases.map((phrase) => ({
        phrase,
        meaning: [clueType],
      }));

      const matches = findMatches(clue, indicators);

      matches.forEach(({ phrase }) => {
        accumulator[phrase] ??= [];
        accumulator[phrase].push(clueType as ClueType);
      });

      return accumulator;
    },
    {} as Record<string, ClueType[]>,
  );

  const indicators = Object.entries(map).map(([phrase, clueTypes]) => ({
    index: clue.indexOf(phrase),
    phrase,
    clueTypes,
  }));

  return indicators
    .sort((a, b) => a.index - b.index)
    .map(({ phrase, clueTypes }) => ({ phrase, clueTypes }));
}
