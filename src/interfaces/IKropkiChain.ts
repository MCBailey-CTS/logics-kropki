import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { IKropkiSolver } from "./IKropkiSolver";
import { Loc } from "../Loc";
import { IHash } from "../../IHash";

export interface IKropkiChain extends IKropkiSolver {
  solve(locs: IHash<Loc>): IEdit[];

  findChains(): IHash<Loc>[];
}
