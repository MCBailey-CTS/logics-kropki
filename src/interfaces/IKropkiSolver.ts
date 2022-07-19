import { LocSet } from "../LocSet";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";

export interface IKropkiSolver {
  get id(): string;

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];
}


