import { KropkiString } from "./KropkiString";
import { Loc } from "./Loc";
// import { BasePuzzleString } from "./BasePuzzleString";


export interface IKropkiChain {
  solve(puzzle: KropkiString, chainLocs: Loc[]): boolean;
}
