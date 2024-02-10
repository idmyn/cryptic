# @idmyn/cryptic

Functions to help you solve cryptic crossword clues, without giving you the answers.

### credit

This repo is an adaptation of [niallmurphy-ie/Cryptic-Crossword-Companion](https://github.com/niallmurphy-ie/Cryptic-Crossword-Companion)

### usage

```ts
parseClue("Silly twit in charge is initially mystified by repartee")

// returns

{
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
}
```
