import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { NewPuzzles } from "./src/NewPuzzles";
import { ChainB } from "./src/new_solvers/ChainB";
import { BaseKropkiChain } from "./src/abstract/BaseKropkiChain";
import { ChainE } from "./src/new_solvers/ChainE";
import { ChainW } from "./src/new_solvers/ChainW";
import { HiddenSingle } from "./src/new_solvers/HiddenSingle";
import { Chain_Debww } from "./src/new_solvers/Chain_Debww";
import { Chain_Dewww } from "./src/new_solvers/Chain_Dewww";
import { Chain_Debwb } from "./src/new_solvers/Chain_Debwb";
import { Chain_Dewbw } from "./src/new_solvers/Chain_Dewbw";
import { Chain_Dbwww } from "./src/new_solvers/Chain_Dbwww";
import { IEdit } from "./src/interfaces/IEdit";
import { IKropkiChain } from "./src/new_solvers/IKropkiChain";
import { Chain_Dewbb as Chain_Dewbb } from "./src/new_solvers/Chain_Dewbb";
import { ChainBB } from "./src/new_solvers/ChainBB";

const puzzleStrings = [
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
  NewPuzzles._Kropki_008,
  NewPuzzles._Kropki_007,
  NewPuzzles._Kropki_006,
  NewPuzzles._Kropki_005,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
];

// const totalEdits = [];

let totalEdits = 0;

const solvedPuzzles = [];

const masterSolvers: IKropkiChain[] = [
  // new ChainB(),
  // new ChainE(),
  // new ChainW(),
  // new HiddenSingle(),
  // new ChainBB(),
  new Chain_Dewbb(),
  // new Chain_Debww(),
  // new Chain_Dewww(),
  // new Chain_Debwb(),
  // new Chain_Dewbw(),
  // new Chain_Dbwww(),
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
      case "009.kropki":
      case "018.kropki":
      case "019.kropki":
      case "004.kropki":
      case "005.kropki":
      case "006.kropki":
      case "010.kropki":
      case "007.kropki":
      case "008.kropki":
      case "011.kropki":
      case "012.kropki":
      case "013.kropki":
      case "014.kropki":
      case "015.kropki":
      case "016.kropki":
      case "017.kropki":
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
