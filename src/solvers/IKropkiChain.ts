import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export interface IKropkiChain {
  get id(): string;

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  findChains(puzzle: IKropkiPuzzle): Loc[][];
}
