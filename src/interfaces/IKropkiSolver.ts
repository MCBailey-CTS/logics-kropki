import { Loc } from "../Loc";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";

export interface IKropkiSolver {
  get id(): string;

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];

  // solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null;
}
