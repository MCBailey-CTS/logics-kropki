import { Loc } from "../Loc";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";

export interface IKropkiSolver {
  get id(): string;

  get puzzle(): IKropkiPuzzle;
  
  set puzzle(puzzle: IKropkiPuzzle);

  solvePuzzle(): IEdit[];

  remove(loc: Loc, ...candidates: number[]): IEdit[];
}
