import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { _BaseKropkiVectorString1 } from "./_BaseKropkiVectorString1";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";

export function newMethod(
  commonHouses: IHash<Loc>[],
  locs: IHash<Loc>,
  puzzle: IKropkiPuzzle,
  list: number[],
  edits: IEdit[],
  solver: IKropkiSolver
) {
  for (const house of commonHouses)
    for (const loc of house)
      if (
        !loc.equals(locs._at(0)) &&
        !loc.equals(locs._at(1)) &&
        puzzle.removeCandidate(loc, list[1])
      )
        edits.push(new Edit(puzzle, loc, list[1], solver));
}

export class Chain_b extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return "b";
  }

  solveChain(locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const loc = locs._at(0);

    const other = locs._at(1);

    const otherHash = this.puzzle.getCellList(other);

    for (const candidate of this.puzzle.getCellList(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!this.puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(this.puzzle, loc, candidate, this));
    }

    const commonHouses = this.puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    const hash = new Set<number>();

    for (const loc of locs)
      for (const candidate of this.puzzle.getCellList(loc)) hash.add(candidate);

    if (hash.size != 3) return edits;

    this.newMethod_1(hash, commonHouses, locs, this.puzzle, edits);

    return edits;
  }

  private newMethod_1(
    hash: Set<number>,
    commonHouses: IHash<Loc>[],
    locs: IHash<Loc>,
    puzzle: IKropkiPuzzle,
    edits: IEdit[]
  ) {
    const list = [...hash];

    list.sort((a, b) => {
      return a - b;
    });

    if (this.isValidList(list)) {
      newMethod(commonHouses, locs, puzzle, list, edits, this);
    }
  }

  isValidList(list: number[]): boolean {
    return list[0] * 2 == list[1] && list[1] * 2 == list[2];
  }
}


