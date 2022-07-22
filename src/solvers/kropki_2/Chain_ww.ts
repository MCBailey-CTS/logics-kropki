import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString2 } from "./_BaseKropkiVectorString2";

export class Chain_ww extends _BaseKropkiVectorString2 {
  get expected_kropki_string(): string {
    return "ww";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    const edge0 = locs._at(0);
    const center = locs._at(1);
    const edge1 = locs._at(2);

    const edgeSet0 = puzzle.getCellList(edge0);
    const centerSet = puzzle.getCellList(center);
    const edgeSet1 = puzzle.getCellList(edge1);

    for (const candidate of edgeSet0) {
      if (!edgeSet1.has(candidate - 2) && !edgeSet1.has(candidate + 2)) {
        edits.push(...this.remove(puzzle, edge0, candidate));
      }
    }

    for (const candidate of edgeSet1) {
      if (!edgeSet0.has(candidate - 2) && !edgeSet0.has(candidate + 2)) {
        edits.push(...this.remove(puzzle, edge1, candidate));
      }
    }

    for (const candidate of edgeSet0) {
      if (!centerSet.has(candidate - 1) && !centerSet.has(candidate + 1)) {
        edits.push(...this.remove(puzzle, edge0, candidate));
      }
    }

    for (const candidate of edgeSet1) {
      if (!centerSet.has(candidate - 1) && !centerSet.has(candidate + 1)) {
        edits.push(...this.remove(puzzle, edge1, candidate));
      }
    }

    return edits;
  }
}
