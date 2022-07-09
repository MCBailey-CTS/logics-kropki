import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";

export interface IKropkiDiamond {
  solve(puzzle: BasePuzzleString, diamondChain: Loc[]): boolean;
}
