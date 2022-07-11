import { IKropkiSolver } from "./IKropkiSolver";
import { KropkiPuzzle } from "./KropkiPuzzle";
import { NewPuzzles } from "./NewPuzzles";
import { KropkiChainBbCenter } from "./KropkiChainBbCenter";
import { KropkiChainBwCenter } from "./KropkiChainBwCenter";
import { KropkiChainWwCenter } from "./KropkiChainWwCenter";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { KropkiDiamondBwww } from "./KropkiDiamondBwww";
import { KropkiDiamondEwww } from "./KropkiDiamondEwww";

const solvers: IKropkiSolver[] = [
  new KropkiChainWwCenter(),
  new KropkiChainBbCenter(),
  new KropkiDiamondBwww(),
  new KropkiDiamondEwww(),
];

const puzzleStrings = [
  NewPuzzles._Kropki_010,
  NewPuzzles._Kropki_001,
  NewPuzzles._Kropki_006,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_018,
];

for (const str of puzzleStrings) {
  console.log("///////////////");
  const puzzle = new KropkiPuzzle(str);

  puzzle.solve(solvers);

  console.log(puzzle.toString());
}

// const puz: IKropkiPuzzle = new KropkiPuzzle(NewPuzzles._Kropki_018);

// new KropkiChainWwCenter().solveCell(puz, new Loc(2 * 4, 2 * 6));
// new KropkiChainWwCenter().solveCell(puz, new Loc(2 * 2, 2 * 7));

// console.log(puz.toPuzzleString());
