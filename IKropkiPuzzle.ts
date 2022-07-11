import { Loc } from "./Loc";
import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";

export interface IKropkiPuzzle {
  get id(): string;
  get length(): number;
  get isSolved(): boolean;
  getCellString(r: Loc | number, c?: number): string;

  getCellCandidates(r: Loc | number, c?: number): number[];

  getCellSet(r: Loc | number, c?: number): Set<number>;

  get sudokuCellLocs(): Loc[];
  removeCandidate(loc: Loc, candidate: number): boolean;

  solve(solvers: IKropkiSolver[]): IEdit[];

  get edits(): IEdit[];
  getKropkiCandidates(candidate: number): Set<number>;

  getKropkiWhiteCandidates(candidate: number): Set<number>;

  getKropkiBlackCandidates(candidate: number): Set<number>;
}
