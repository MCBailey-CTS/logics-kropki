import { BaseKropkiChain } from "./src/abstract/BaseKropkiChain";
import { IEdit } from "./src/interfaces/IEdit";
import { NewPuzzles } from "./src/NewPuzzles";
import { Chain_b } from "./src/new_solvers/Chain_b";
import { Chain_bb } from "./src/new_solvers/Chain_bb";
import { Chain_e } from "./src/new_solvers/Chain_e";
import { Chain_bw } from "./src/new_solvers/Chain_bw";
import { Chain_Dbwww } from "./src/new_solvers/Chain_Dbwww";
import { Chain_Debwb } from "./src/new_solvers/Chain_Debwb";
import { Chain_Debww } from "./src/new_solvers/Chain_Debww";
import { Chain_Dewbw } from "./src/new_solvers/Chain_Dewbw";
import { Chain_Dewww } from "./src/new_solvers/Chain_Dewww";
import { Chain_w } from "./src/new_solvers/Chain_w";
import { Chain_ww } from "./src/new_solvers/Chain_ww";
import { CrossHatch } from "./src/new_solvers/CrossHatch";
import { HiddenSingle } from "./src/new_solvers/HiddenSingle";
import { IKropkiChain } from "./src/new_solvers/IKropkiChain";
import { NakedPair } from "./src/new_solvers/NakedPair";
import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { Chain_Dewbb } from "./src/new_solvers/Chain_Dewbb";

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
  NewPuzzles._Kropki_005,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
  NewPuzzles._Kropki_006,
];

// const totalEdits = [];

let totalEdits = 0;

const solvedPuzzles = [];

const masterSolvers: IKropkiChain[] = [
  new Chain_b(),
  new Chain_e(),
  new Chain_w(),
  new HiddenSingle(),
  new NakedPair(),
  new Chain_bb(),
  new Chain_bw(),
  new Chain_ww(),
  new Chain_Dewbb(),
  new Chain_Debww(),
  new Chain_Dewww(),
  new Chain_Debwb(),
  new Chain_Dewbw(),
  new Chain_Dbwww(),
  new CrossHatch(),
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
