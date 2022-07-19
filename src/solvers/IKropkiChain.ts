import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../interfaces/IKropkiSolver";
import { Loc } from "../Loc";

export interface IKropkiChain extends IKropkiSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  findChains(puzzle: IKropkiPuzzle): Loc[][];
}
