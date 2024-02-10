import { expect, test } from "bun:test";

import { parseClue, findAbbreviations } from ".";

test("findAbbreviations", () => {
  expect(findAbbreviations("he was a barbarian bachelor of medicine")).toEqual([
    // shouldn't include phrase 'as' which partially matches 'was'
    {
      phrase: "a",
      abbreviations: ["i", "per"],
    },
    {
      phrase: "barbarian",
      abbreviations: ["hun"],
    },
    {
      phrase: "bachelor of medicine",
      abbreviations: ["bm"],
    },
    {
      phrase: "bachelor",
      abbreviations: ["bm", "mb"],
    },
    {
      phrase: "of",
      abbreviations: ["de"],
    },
  ]);
});

test("parseClue", () => {
  expect(
    parseClue("Silly twit in charge is initially mystified by repartee"),
  ).toEqual({
    abbreviations: [
      {
        phrase: "in charge",
        abbreviations: ["ic"],
      },
      {
        phrase: "is",
        abbreviations: ["s", "est"],
      },
      {
        phrase: "by",
        abbreviations: ["per", "x"],
      },
    ],
    indicators: [
      {
        phrase: "silly",
        clueTypes: ["anagram"],
      },
      {
        phrase: "in",
        clueTypes: ["insertion", "linking", "letter selection"],
      },
      {
        phrase: "is",
        clueTypes: ["linking"],
      },
      {
        phrase: "initially",
        clueTypes: ["letter selection"],
      },
      {
        phrase: "by",
        clueTypes: ["juxtaposition"],
      },
    ],
  });
});
