import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { NewPuzzles } from "./src/NewPuzzles";
import { IKropkiSolver } from "./src/interfaces/IKropkiSolver";
import { ChainB } from "./src/new_solvers/ChainB";
import { BaseKropkiChain } from "./src/abstract/BaseKropkiChain";
import { ChainE } from "./src/new_solvers/ChainE";
import { ChainW } from "./src/new_solvers/ChainW";
import {
  HiddenSingle,
  NakedPair,
  NakedQuad,
} from "./src/new_solvers/HiddenSingle";
import { XWing } from "./src/new_solvers/XWing";
import { HiddenPair } from "./src/new_solvers/HiddenPair";
import { ChainBB } from "./src/new_solvers/ChainBB";
import { ChainBWW } from "./src/new_solvers/ChainBWW";
import { ChainDBWWW } from "./src/new_solvers/ChainDBWWW";
import { ChainBW } from "./src/new_solvers/ChainBW";
import { ChainDWBBE } from "./src/new_solvers/ChainDWBBE";
import { ChainWWW } from "./src/new_solvers/ChainWWW";
import { ChainWWWWW } from "./src/new_solvers/ChainWWWWW";
import { ChainWWWW } from "./src/new_solvers/ChainWWWW";
import { HiddenTriple } from "./src/new_solvers/HiddenTriple";
import { ChainWW } from "./src/new_solvers/ChainWW";
import { ChainDEBWB } from "./src/new_solvers/ChainDEBWB";
import { Chain_Debww } from "./src/new_solvers/Chain_Debww";
import { ChainDEWWW } from "./src/new_solvers/ChainDEWWW";
import { IEdit } from "./src/interfaces/IEdit";
import { IKropkiChain } from "./src/new_solvers/IKropkiChain";
// import { KropkiChain2 } from "./src/new_solvers/KropkiChain";

const solvers: IKropkiSolver[] = [
  // new KropkiBlack(),
  // new KropkiWhite(),
  // new KropkiEmptyDominate(),
  // new KropkiChainBwCenter(),
  // new KropkiChainWwCenter(),
  // new KropkiChainBbCenter(),
  // new KropkiDiamondBwww(),
  // new KropkiDiamondEwww(),
  // new KropkiSudoku(),
  // new KropkiBlack2Cells(),
  // new KropkiWhite2Cells(),
  // new KropkiChain2()
  // new BaseKropkiChain(),
];

const puzzleStrings = [
  NewPuzzles._Kropki_008,
  NewPuzzles._Kropki_005,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
  NewPuzzles._Kropki_006,

  NewPuzzles._Kropki_022,
  NewPuzzles._Kropki_021,
  NewPuzzles._Kropki_019,
  NewPuzzles._Kropki_018,
  NewPuzzles._Kropki_017,
  NewPuzzles._Kropki_016,
  NewPuzzles._Kropki_015,
  NewPuzzles._Kropki_014,
  NewPuzzles._Kropki_013,
  NewPuzzles._Kropki_012,
  NewPuzzles._Kropki_011,
  NewPuzzles._Kropki_010,

  NewPuzzles._Kropki_009,
  NewPuzzles._Kropki_007,
];

// const totalEdits = [];

let totalEdits = 0;

const solvedPuzzles = [];

const masterSolvers: IKropkiChain[] = [
  // new ChainB(),
  // new ChainE(),
  // new ChainW(),
  // // new ChainWW(),
  // // new HiddenSingle(),
  // new ChainBB(),
  // new ChainBW(),
  // new ChainBWW(),
  // new ChainDBWWW(),
  // new ChainDWBBE(),
  // new ChainDWBBE(),
  // new NakedPair(),
  // new ChainWWW(),
  // new ChainWWWW(),
  // // new HiddenPair(),
  // // new ChainDEBWB(),
  // new ChainDEWBB(),
  // // new ChainDEWWW(),
];

for (const str of puzzleStrings) {
  // console.log("///////////////");

  const puzzle = new KropkiPuzzle(str);
  try {
    // puzzle.solve(solvers);

    const resultingEdits: IEdit[] = [];

    switch (puzzle.id) {
      case "001.kropki":
      case "002.kropki":
      case "003.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            new ChainB(),
            new ChainE(),
            new ChainW(),
            new HiddenSingle(),
          ])
        );

        break;
      case "009.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            // new ChainB(),
            // new ChainE(),
            // new ChainW(),
            // new NakedPair(),
            // new HiddenSingle(),
            // new ChainDEWWW(),
            // new ChainWWW(),
            // new ChainWW(),
            // new ChainDEBWB(),
            // new ChainBB(),
            // new ChainBW(),
            // new ChainBWW(),
            // new ChainDBWWW(),
            // new ChainDWBBE(),
            // new ChainDWBBE(),
            // new ChainWWW(),
            // new ChainWWWW(),
            // new HiddenPair(),
            // new ChainDEBWB(),
            new Chain_Debww(),
            // new ChainDEWWW(),
          ])
        );

        break;

      case "018.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            new ChainB(),
            new ChainE(),
            new ChainW(),
            new NakedPair(),
            new HiddenSingle(),
            new ChainDEWWW(),
            new ChainWWW(),
            new ChainWW(),
            new ChainDEBWB(),
            new ChainBB(),
            new ChainBW(),
            new ChainBWW(),
            new ChainDBWWW(),
            new ChainDWBBE(),
            new ChainDWBBE(),
            new ChainWWW(),
            new ChainWWWW(),
            new HiddenPair(),
            new ChainDEBWB(),
            new Chain_Debww(),
            new ChainDEWWW(),
          ])
        );

        break;

      case "004.kropki":
      case "005.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            new ChainB(),
            new ChainE(),
            new ChainW(),
            new NakedPair(),
            new Chain_Debww(),
          ])
        );
        break;
      case "006.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            new ChainB(),
            new ChainE(),
            new ChainW(),
            new NakedPair(),
            new HiddenSingle(),
            new ChainDEWWW(),
            new ChainWWW(),
            new ChainWW(),
            new ChainDEBWB(),
            new ChainBB(),
            new ChainBW(),
            new ChainBWW(),
            new ChainDBWWW(),
            new ChainDWBBE(),
            new ChainDWBBE(),
            new ChainWWW(),
            new ChainWWWW(),
            new HiddenPair(),
            new ChainDEBWB(),
            new Chain_Debww(),
            new ChainDEWWW(),
          ])
        );

        break;

      case "010.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            new ChainB(),
            new ChainE(),
            new ChainW(),
            new NakedPair(),
            new HiddenSingle(),
            new ChainDEWWW(),
            new ChainWWW(),
            new ChainWW(),
            new ChainDEBWB(),
            new ChainBB(),
            new ChainBW(),
            new ChainBWW(),
            new ChainDBWWW(),
            new ChainDWBBE(),
            new ChainDWBBE(),
            new ChainWWW(),
            new ChainWWWW(),
            new HiddenPair(),
            new ChainDEBWB(),
            new Chain_Debww(),
            new ChainDEWWW(),
          ])
        );

        break;

      case "007.kropki":
        resultingEdits.push(
          ...BaseKropkiChain.solve(puzzle, [
            // new ChainB(),
            // new ChainE(),
            // new ChainW(),
            new Chain_Debww(),
            // new NakedPair(),
            // new HiddenSingle(),
            // new ChainDEWWW(),
            // new ChainWWW(),
            // new ChainWW(),
            // new ChainDEBWB(),
            // new ChainBB(),
            // new ChainBW(),
            // new ChainBWW(),
            // new ChainDBWWW(),
            // new ChainDWBBE(),
            // new ChainDWBBE(),
            // new ChainWWW(),
            // new ChainWWWW(),
            // new HiddenPair(),
            // new ChainDEBWB(),
            // new ChainDEWBB(),
            // new ChainDEWWW(),
          ])
        );

        break;
      case "008.kropki":

      case "011.kropki":
      case "012.kropki":
      case "013.kropki":
      case "014.kropki":
      case "015.kropki":
      case "016.kropki":
      case "017.kropki":

      case "019.kropki":
      case "020.kropki":
      case "021.kropki":
      case "022.kropki":
        resultingEdits.push(...BaseKropkiChain.solve(puzzle, masterSolvers));

        break;

      default:
        console.log(`Unknown puzzle: '${puzzle.id}'`);

        break;
    }

    totalEdits += resultingEdits.length;

    if (puzzle.isSolved) {
      solvedPuzzles.push(puzzle);

      continue;
    }

    if (puzzle.id == "004.kropki")
      console.log(
        `Column [4] has a hidden triple, should be faster than naked quad`
      );

    console.log(puzzle.toString());
    console.log(`Edits: ${resultingEdits.length}`);

    console.log("//////////");
  } catch (err) {
    console.log("//////////");
    console.log(puzzle.id);
    console.log(err);
    console.log("//////////");
  }
}

console.log();

console.log(`Total edits: ${totalEdits}`);

for (const puzzle of solvedPuzzles) {
  console.log(`${puzzle.id}`);
  // console.log(`${puzzle.id} == ${puzzle.edits.length} edits`);
}

console.log(`Total solved: ${solvedPuzzles.length}`);

//
