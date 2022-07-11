import { BaseKropkiSolver } from "./BaseKropkiSolver";
import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { KropkiBlack } from "./KropkiBlack";
import { KropkiEmptyDominate } from "./KropkiEmptyDominate";
import { KropkiDiamondBwww } from "./KropkiDiamondBwww";
import { KropkiWhite } from "./KropkiWhite";
import { KropkiString } from "./KropkiString";
import { Loc } from "./Loc";
import { MainFunction } from "./NewMain";
import { NewPuzzles } from "./NewPuzzles";

const solvers: IKropkiSolver[] = [new KropkiDiamondBwww()];

const puzzleStrings = [
  NewPuzzles._Kropki_006,
  NewPuzzles._Kropki_004,
  NewPuzzles._Kropki_003,
  NewPuzzles._Kropki_002,
  NewPuzzles._Kropki_001,
];

for (const str of puzzleStrings) {
  console.log("///////////////");
  const puzzle = new KropkiString(str);

  puzzle.solve(solvers);

  console.log(puzzle.toString());
}

export class KropkiChainBw extends BaseKropkiSolver {
  get id(): string {
    throw new Error("Method not implemented.");
  }
  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null {
    throw new Error("Method not implemented.");
  }
}
