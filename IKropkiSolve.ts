import { Loc } from "./Loc";

export interface IKropkiSolve {
  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];

  solveCell(puzzle: IKropkiPuzzle, loc: Loc): IEdit[];

  get id(): string;
}

export interface IKropkiPuzzle {
  get id(): string;

  get length():number;

  get isSolved(): boolean;

  getLocString(r: Loc | number, c?: number): string;

  getExplicitLocString(r: Loc | number, c?: number): string;

  getCellList(r: Loc | number, c?: number): number[];

  getExplicitCellList(r: Loc | number, c?: number): number[];

  getCellSet(r: Loc | number, c?: number): IHash<number>;

  getExplicitCellSet(r: Loc | number, c?: number): IHash<number>;
}

export interface IEdit {
  get puzzle(): IKropkiPuzzle;

  get loc(): Loc;

  get technique(): IKropkiSolve;

  get candidate(): number;
}

export interface IHash<T> {
  union(other: T[]): IHash<T>;

  intersection(other: T[]): IHash<T>;

  subtract(other: T[]): IHash<T>;

  setEquals(other: T[]): IHash<T>;

  add(item: T): boolean;

  remove(item: T): boolean;

  has(item: T): boolean;

  isSubsetOf(other: T[]): boolean;

  isProperSubsetOf(other: T[]): boolean;

  isSupersetOf(other: T[]): boolean;

  isProperSupersetOf(other: T[]): boolean;

  get count(): number;

  get items(): T[];

  get comparer(): IEqualityComparer<T> | undefined;
}

export interface IEqualityComparer<T> {
  hashCode(item: T): number;

  equalItems(item0: T, item1: T): boolean;
}
