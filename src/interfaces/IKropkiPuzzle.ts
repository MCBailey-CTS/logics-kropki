import { IKropkiSolver } from "./IKropkiSolver";
import { IEdit } from "./IEdit";
import { Loc } from "../Loc";
import { IHash } from "../../IHash";

export interface IKropkiPuzzle {
  get id(): string;

  get length(): number;

  get isSolved(): boolean;

  get edits(): IEdit[];

  get sudokuCellLocs(): Loc[];

  get hasFences(): boolean;

  get fences(): string[];

  get grid(): string[][];

  getFenceLocs(fence: string): IHash<Loc>;

  // getFence(r:number, c:number): string;
  getFence(loc: Loc): string;

  getCellString(r: Loc | number, c?: number): string;

  getCellList(r: Loc | number, c?: number): IHash<number>;

  get expectedCandidates(): IHash<number>;

  removeCandidate(loc: Loc, candidate: number): boolean;

  getKropkiCandidates(candidate: number): IHash<number>;

  getKropkiWhiteCandidates(candidate: number): IHash<number>;

  getKropkiBlackCandidates(candidate: number): IHash<number>;

  toPuzzleString(): string;

  // getNeighbors1(loc: Loc): Loc[];

  getRowHouses(): Array<IHash<Loc>>;

  getColHouses(): Array<IHash<Loc>>;

  getCellIntersections(loc: Loc): Loc[];

  // getSurroundingCellLocs(cellLoc: Loc): Loc[];

  getIntersection(loc0: Loc, loc1: Loc): Loc;

  getCommonHouses(chain: IHash<Loc>): Array<IHash<Loc>>;

  getRowHouse(loc: Loc): IHash<Loc>;

  getColHouse(loc: Loc): IHash<Loc>;

  getHouses(): Array<IHash<Loc>>;
}
