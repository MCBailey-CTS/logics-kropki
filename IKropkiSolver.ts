import { Loc } from "./Loc";

export interface IKropkiSolver {
  get id(): string;

  // solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit | null;
}

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

  get edits():IEdit[];

  // getWhiteCandidates
}

export interface IEdit {
  get puzzle(): IKropkiPuzzle;

  get loc(): Loc;

  get solver(): IKropkiSolver;

  get candidate(): number;
}

// export interface IHash<T> {
//   union(other: T[]): T[];

//   intersection(other: T[]): IHash<T>;

//   subtract(other: T[]): IHash<T>;

//   setEquals(other: T[]): IHash<T>;

//   add(item: T): boolean;

//   remove(item: T): boolean;

//   has(item: T): boolean;

//   isSubsetOf(other: T[]): boolean;

//   isProperSubsetOf(other: T[]): boolean;

//   isSupersetOf(other: T[]): boolean;

//   isProperSupersetOf(other: T[]): boolean;

//   get count(): number;

//   get items(): T[];

//   get comparer(): IEqualityComparer<T> | undefined;
// }

// export interface IEqualityComparer<T> {
//   hashCode(item: T): number;

//   equalItems(item0: T, item1: T): boolean;
// }
