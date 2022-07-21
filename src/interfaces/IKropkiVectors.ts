import { IHash } from "../../IHash";
import { Loc } from "../Loc";
import { IKropkiSolver } from "./IKropkiSolver";

export interface IKropkiVectors extends IKropkiSolver {
  get vector_chains(): IHash<Loc>[];
  get expected_kropki_string(): string;
}
