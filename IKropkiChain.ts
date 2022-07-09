import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";


export interface IKropkiChain {
  solve(puzzle: BasePuzzleString, chainLocs: Loc[]): boolean;
}
