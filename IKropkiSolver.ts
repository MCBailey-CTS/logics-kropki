import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "./Loc";

export interface IKropkiSolver {
  get id(): string;

  // solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null;
}
