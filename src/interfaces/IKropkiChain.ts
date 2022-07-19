import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { IKropkiSolver } from "./IKropkiSolver";
import { Loc } from "../Loc";

export interface IKropkiChain extends IKropkiSolver {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  findChains(puzzle: IKropkiPuzzle): Loc[][];
}
