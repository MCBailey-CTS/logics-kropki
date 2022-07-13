import { IKropkiSolver } from "./IKropkiSolver";
import { KropkiPuzzle } from "./KropkiPuzzle";
import { NewPuzzles } from "./NewPuzzles";
import { KropkiChainBbCenter } from "./KropkiChainBbCenter";
import { KropkiChainBwCenter } from "./KropkiChainBwCenter";
import { KropkiChainWwCenter } from "./KropkiChainWwCenter";
import { KropkiCrossHatch } from "./KropkiCrossHatch";
import { KropkiNakedPair } from "./KropkiNakedPair";
import { KropkiDiamondBwww } from "./KropkiDiamondBwww";
import { KropkiDiamondEwww } from "./KropkiDiamondEwww";
import { KropkiBlack } from "./KropkiBlack";
import { KropkiBlack2Cells } from "./KropkiBlack2Cells";
import { KropkiWhite } from "./KropkiWhite";
import { KropkiEmptyDominate } from "./KropkiEmptyDominate";
import { KropkiSudoku } from "./KropkiSudoku";

const solvers: IKropkiSolver[] = [
  new KropkiBlack(),
  new KropkiWhite(),
  new KropkiEmptyDominate(),
  new KropkiChainBwCenter(),
  new KropkiChainWwCenter(),
  new KropkiChainBbCenter(),
  new KropkiDiamondBwww(),
  new KropkiDiamondEwww(),
  new KropkiSudoku(),
  new KropkiBlack2Cells(),
];

const puzzleStrings = [
  NewPuzzles._Kropki_022,
  NewPuzzles._Kropki_021,
  NewPuzzles._Kropki_020,
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
  NewPuzzles._Kropki_006,
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
    puzzle.solve(solvers);

    // totalEdits.push(... [puzzle.solve(solvers)]);

    totalEdits += puzzle.edits.length;

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
  console.log(`Solved: ${puzzle.id} == ${puzzle.edits.length} edits`);
}

console.log(`Total edits: ${totalEdits}`);

console.log(`Total solved: ${solvedPuzzles.length}`);

//
