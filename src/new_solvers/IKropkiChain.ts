import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";

export interface IKropkiChain extends IKropkiSolver {
  get id(): string;

  isValidString(puzzle: IKropkiPuzzle, kropkiStr: string): boolean;

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];
}
