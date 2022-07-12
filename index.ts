import { IKropkiSolver } from "./IKropkiSolver";
import { KropkiPuzzle } from "./KropkiPuzzle";
import { NewPuzzles } from "./NewPuzzles";
import { KropkiChainBbCenter } from "./KropkiChainBbCenter";
import { KropkiChainBwCenter } from "./KropkiChainBwCenter";
import { KropkiChainWwCenter } from "./KropkiChainWwCenter";
import { KropkiCrossHatch } from "./KropkiCrossHatch";
import { KropkiNakedPair } from "./KropkiNakedPair";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";
import { KropkiDiamondBwww } from "./KropkiDiamondBwww";
import { KropkiDiamondEwww } from "./KropkiDiamondEwww";
import { KropkiBlack } from "./KropkiBlack";
import { KropkiBlack2Cells } from "./KropkiBlack2Cells";
import { KropkiWhite } from "./KropkiWhite";
import { KropkiEmptyDominate } from "./KropkiEmptyDominate";
import { IEdit } from "./IEdit";
import { NewTechniques } from "./NewTechniques";
import { Edit } from "./Edit";

export class KropkiSudoku implements IKropkiSolver {
  get id(): string {
    return "KropkiSudoku";
  }

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    if (!loc.equals(new Loc(0, 0))) return null;

    for (let i = 0; i < puzzle.length; i++) {
      const rowLocs = Loc.getKropkiCellRowHouseLocs(puzzle.length, i);

      const colLocs = Loc.getKropkiCellColHouseLocs(puzzle.length, i);

      if (
        KropkiSudoku.solveSudokuLocs(puzzle.grid, puzzle.length, rowLocs) ||
        KropkiSudoku.solveSudokuLocs(puzzle.grid, puzzle.length, colLocs)
      )
        return new Edit(puzzle, loc, 0, this);
    }

    return null;
  }

  static solveSudokuLocs(
    _grid: string[][],
    _length: number,
    locs: Loc[]
  ): boolean {
    if (_length != locs.length)
      throw new Error(`Invalid number of locs vs length`);

    if (NewTechniques.solveSudokuCrossHatchLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedPairLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuHiddenSingleLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedTripleLocs(_grid, _length, locs))
      return true;

    if (NewTechniques.solveSudokuNakedQuadLocs(_grid, _length, locs))
      return true;

    return false;
  }
}

const solvers: IKropkiSolver[] = [
  new KropkiBlack(),
  new KropkiWhite(),
  new KropkiEmptyDominate(),
  new KropkiChainBwCenter(),
  new KropkiChainBbCenter(),
  new KropkiDiamondBwww(),
  new KropkiDiamondEwww(),
  new KropkiCrossHatch(),
  new KropkiNakedPair(),
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

  puzzle.solve(solvers);

  // totalEdits.push(... [puzzle.solve(solvers)]);

  totalEdits += puzzle.edits.length;

  if (puzzle.isSolved) {
    solvedPuzzles.push(puzzle);

    continue;
  }

  console.log(puzzle.toString());
}

console.log();

console.log(`Total edits: ${totalEdits}`);

for (const puzzle of solvedPuzzles) {
  console.log(`Solved: ${puzzle.id} == ${puzzle.edits.length} edits`);
}

console.log(`Total edits: ${totalEdits}`);

console.log(`Total solved: ${solvedPuzzles.length}`);

//
