import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { Loc } from "../Loc";

export interface IKropkiPuzzle {
  get id(): string;

  get length(): number;

  get isSolved(): boolean;

  get edits(): IEdit[];

  get sudokuCellLocs(): Loc[];

  get hasFences(): boolean;

  get fences(): string[];

  get grid(): string[][];

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

  toPuzzleString(): string;

  getNeighbors(loc: Loc): Loc[];

  getRowHouses(): Loc[][];

  getColHouses(): Loc[][];

  getCellIntersections(loc:Loc):Loc[];
}
