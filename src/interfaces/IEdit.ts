import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "../Loc";
import { IKropkiSolver } from "./IKropkiSolver";
import { IKropkiChain } from "../new_solvers/IKropkiChain";

export interface IEdit {
  get puzzle(): IKropkiPuzzle;
  get loc(): Loc;
  get solver(): IKropkiSolver|IKropkiChain;
  get candidate(): number;
}
