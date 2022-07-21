import { IHash } from "../../IHash";
import { Loc } from "../Loc";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";

export interface IFutoshikiPuzzle {
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

  get expectedCandidates(): number[];

  toPuzzleString(): string;

  getNeighbors(loc: Loc): Loc[];

  getRowHouses(): Loc[][];

  getColHouses(): Loc[][];

  getCellIntersections(loc: Loc): Loc[];

  getSurroundingCellLocs(cellLoc: Loc): Loc[];

  getIntersection(loc0: Loc, loc1: Loc): Loc;

  getCommonHouses(chain: Loc[]): Loc[][];

  getRowHouse(loc: Loc): Loc[];

  getColHouse(loc: Loc): Loc[];

  getHouses(): Loc[][];

  getRowLocsWithCandidate(row: number | Loc, candidate: number): Loc[];

  getColLocsWithCandidate(col: number | Loc, candidate: number): Loc[];

  getFenceLocsWithCandidate(fence: string | Loc, candidate: number): Loc[];

  getCellHash(r: Loc | number, c?: number): IHash;
}
