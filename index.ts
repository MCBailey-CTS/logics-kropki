import { IKropkiSolver } from "./IKropkiSolver";
import { KropkiPuzzle } from "./KropkiPuzzle";
import { NewPuzzles } from "./NewPuzzles";
import { KropkiChainBbCenter } from "./KropkiChainBbCenter";
import { KropkiChainBwCenter } from "./KropkiChainBwCenter";
import { KropkiChainWwCenter } from "./KropkiChainWwCenter";
import { KropkiCrossHatch } from "./KropkiCrossHatch";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { KropkiDiamondBwww } from "./KropkiDiamondBwww";
import { KropkiDiamondEwww } from "./KropkiDiamondEwww";
import { KropkiBlack } from "./KropkiBlack";
import { KropkiWhite } from "./KropkiWhite";
import { KropkiEmptyDominate } from "./KropkiEmptyDominate";

const solvers: IKropkiSolver[] = [
  new KropkiBlack(),
  new KropkiWhite(),
  new KropkiEmptyDominate(),
  new KropkiChainBwCenter(),
  new KropkiChainBbCenter(),
  new KropkiDiamondBwww(),
  new KropkiDiamondEwww(),
  new KropkiCrossHatch(),
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
  //   NewPuzzles._Kropki_008,
  NewPuzzles._Kropki_007,
  NewPuzzles._Kropki_006,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
];

// const totalEdits = [];

let totalEdits = 0;

for (const str of puzzleStrings) {
  console.log("///////////////");

  const puzzle = new KropkiPuzzle(str);

  puzzle.solve(solvers);

  // totalEdits.push(... [puzzle.solve(solvers)]);

  totalEdits += puzzle.edits.length;

  if (puzzle.isSolved) {
    console.log(`Solved: ${puzzle.id} == ${puzzle.edits.length} edits`);

    continue;
  }

  console.log(puzzle.toString());
}

console.log(`Total edits: ${totalEdits}`);

// const puz: IKropkiPuzzle = new KropkiPuzzle(NewPuzzles._Kropki_018);

// new KropkiChainWwCenter().solveCell(puz, new Loc(2 * 4, 2 * 6));
// new KropkiChainWwCenter().solveCell(puz, new Loc(2 * 2, 2 * 7));

// console.log(puz.toPuzzleString());
