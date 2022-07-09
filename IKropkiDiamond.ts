import { KropkiString } from "./KropkiString";
import { Loc } from "./Loc";
// import { BasePuzzleString } from "./BasePuzzleString";

export interface IKropkiDiamond {
  solve(puzzle: KropkiString, diamondChain: Loc[]): boolean;
}
