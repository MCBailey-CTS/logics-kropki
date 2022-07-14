import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";

export interface IKropkiChain {
  get id(): string;

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  findChains(puzzle: IKropkiPuzzle): Loc[][];
}
