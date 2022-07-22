import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { _BaseKropkiVectorString1 } from "./_BaseKropkiVectorString1";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";

function newMethod(
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

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const loc = locs._at(0);

    const other = locs._at(1);

    const otherHash = puzzle.getCellList(other);

    for (const candidate of puzzle.getCellList(loc)) {
      if (otherHash.has(candidate * 2)) continue;

      if (candidate % 2 == 0 && otherHash.has(candidate / 2)) continue;

      if (!puzzle.removeCandidate(loc, candidate)) continue;

      edits.push(new Edit(puzzle, loc, candidate, this));
    }

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    const hash = new Set<number>();

    for (const loc of locs)
      for (const candidate of puzzle.getCellList(loc)) hash.add(candidate);

    if (hash.size != 3) return edits;

    this.newMethod_1(hash, commonHouses, locs, puzzle, edits);

    return edits;
  }

  private newMethod_1(hash: Set<number>, commonHouses: IHash<Loc>[], locs: IHash<Loc>, puzzle: IKropkiPuzzle, edits: IEdit[]) {
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

export class Chain_e extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return ".";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of puzzle.getCellList(locs._at(0))) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellList(locs._at(1));

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash._size > 0) continue;

      if (!puzzle.removeCandidate(locs._at(0), candidate)) continue;

      edits.push(new Edit(puzzle, locs._at(0), candidate, this));
    }

    return edits;
  }
}

export class Chain_w extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return "w";
  }

  isValidCandidate(candidate: number, other: IHash<number>): boolean {
    // return true;
    return other.has(candidate + 1) || other.has(candidate - 1);
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    // const loc = locs._at(0);

    // const other = locs._at(1);

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    const otherHash = puzzle.getCellList(locs._at(1));

    for (const candidate of puzzle.getCellList(locs._at(0))) {
      if (this.isValidCandidate(candidate, otherHash)) continue;

      if (!puzzle.removeCandidate(locs._at(0), candidate)) continue;

      edits.push(new Edit(puzzle, locs._at(0), candidate, this));
    }

    const hash = new Set<number>();

    for (const loc of locs)
      for (const candidate of puzzle.getCellList(loc)) hash.add(candidate);

    if (hash.size != 3) return edits;

    const list = [...hash];

    list.sort((a, b) => {
      return a - b;
    });

    if (list[0] + 1 == list[1] && list[1] + 1 == list[2]) {
      // if (puzzle.id != "008.kropki") return edits;

      newMethod(commonHouses, locs, puzzle, list, edits, this);
    }

    return edits;
  }
}

// 160
