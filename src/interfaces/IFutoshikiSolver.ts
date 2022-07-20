import { Loc } from "../Loc";
import { IEdit } from "./IEdit";
import { IFutoshikiPuzzle } from "./IFutoshikiPuzzle";

export interface IFutoshikiSolver {
  get id(): string;
  solvePuzzle(puzzle: IFutoshikiPuzzle): IEdit[];

  remove(puzzle: IFutoshikiPuzzle, loc: Loc, ...candidates: number[]): IEdit[];
}
