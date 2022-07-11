import { Loc } from "./Loc";
import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";

export interface IKropkiPuzzle {
  get id(): string;

  get length(): number;

  get isSolved(): boolean;

  get edits(): IEdit[];

  get sudokuCellLocs(): Loc[];

  get hasFences(): boolean;

  get fences(): string[];

  getFenceLocs(fence: string): Loc[];

  getFence(loc: Loc): string;

  getCellString(r: Loc | number, c?: number): string;

  getCellCandidates(r: Loc | number, c?: number): number[];

  getCellSet(r: Loc | number, c?: number): Set<number>;

  removeCandidate(loc: Loc, candidate: number): boolean;

  solve(solvers: IKropkiSolver[]): IEdit[];

  getKropkiCandidates(candidate: number): Set<number>;

  getKropkiWhiteCandidates(candidate: number): Set<number>;

  getKropkiBlackCandidates(candidate: number): Set<number>;
}
