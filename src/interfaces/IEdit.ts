import { IKropkiPuzzle } from "./IKropkiPuzzle";
import { Loc } from "../Loc";
import { IKropkiSolver } from "./IKropkiSolver";

export interface IEdit {
  get puzzle(): IKropkiPuzzle;
  get loc(): Loc;
  get solver(): IKropkiSolver;
  get candidate(): number;
}
