import { KropkiPuzzle } from "./src/puzzles/KropkiPuzzle";
import { NewPuzzles } from "./src/NewPuzzles";
import { IKropkiSolver } from "./src/interfaces/IKropkiSolver";
import { ChainB } from "./src/new_solvers/ChainB";
import { BaseKropkiChain } from "./src/abstract/BaseKropkiChain";
import { ChainE } from "./src/new_solvers/ChainE";
import { ChainW } from "./src/new_solvers/ChainW";
import { HiddenSingle } from "./src/new_solvers/HiddenSingle";
import { ChainBB } from "./src/new_solvers/ChainBB";
import { ChainBWW } from "./src/new_solvers/ChainBWW";
import { ChainDBWW } from "./src/new_solvers/ChainDBWW";
import { ChainBW } from "./src/new_solvers/ChainBW";
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
  NewPuzzles._Kropki_022,
  NewPuzzles._Kropki_021,
  // NewPuzzles._Kropki_020,
  NewPuzzles._Kropki_019,
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
  NewPuzzles._Kropki_006,
  // NewPuzzles._Kropki_005,
  NewPuzzles._Kropki_018,

  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
];

// const totalEdits = [];

let totalEdits = 0;

const solvedPuzzles = [];

for (const str of puzzleStrings) {
  // console.log("///////////////");

  const puzzle = new KropkiPuzzle(str);
  try {
    // puzzle.solve(solvers);

    totalEdits += BaseKropkiChain.solve(puzzle, [
      // new ChainB(),
      // new ChainE(),
      // new ChainW(),
      // new HiddenSingle(),
      // new HiddenPair(), exists in row [3] of 003.kropki
      // new ChainBB(),
      // new ChainBW(),
      new ChainDBWW(),
    ]).length;

    if (puzzle.isSolved) {
      solvedPuzzles.push(puzzle);

      continue;
    }

    console.log(puzzle.toString());
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
