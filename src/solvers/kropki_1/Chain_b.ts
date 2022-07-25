import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { IKropkiSolver } from "../../interfaces/IKropkiSolver";
import { Loc } from "../../Loc";

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

export class Chain_b implements IKropkiSolver {
  /////////////
  __puzzle: IKropkiPuzzle | undefined = undefined;

  get puzzle(): IKropkiPuzzle {
    if (typeof this.__puzzle == "undefined")
      throw Error(`You have not set a puzzle for the solver ${this.id}`);

    return this.__puzzle;
  }

  set puzzle(puzzle: IKropkiPuzzle) {
    if (typeof this.__puzzle != "undefined")
      throw Error(`You can only set a puzzle one time the solver ${this.id}`);

    this.__puzzle = puzzle;
  }

  get id(): string {
    return this.constructor.name;
  }

  remove(loc: Loc, ...candidates: number[]): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of candidates)
      if (this.puzzle.removeCandidate(loc, candidate))
        edits.push(new Edit(this.puzzle, loc, candidate, this));

    return edits;
  }

  solvePuzzle(): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of this.puzzle.sudokuCellLocs)
      for (const vectorChain of this.vector_chains) {
        const locs: IHash<Loc> = new Hash<Loc>([loc]);

        let intersectionString = "";

        for (const vec of vectorChain) {
          const previous = locs._at(locs._length - 1);

          const next = previous.add_vector(vec.row, vec.col);

          if (!next.isValidKropkiLoc(this.puzzle.length)) break;

          // continue;
          const intersectionLoc = this.puzzle.getIntersection(previous, next);

          intersectionString += this.puzzle.getCellString(intersectionLoc);

          locs.push(next);
        }

        if (this.expected_kropki_string != intersectionString) continue;

        if (vectorChain._length + 1 != locs._length) continue;

        edits.push(...this.solveChain(locs));
      }

    return edits;
  }
  ///////////

  get vector_chains(): IHash<Loc>[] {
    const _base = new Loc(0, 0);

    const chains: IHash<Loc>[] = [];

    chains.push(new Hash<Loc>([_base.right(2)]));
    chains.push(new Hash<Loc>([_base.up(2)]));
    chains.push(new Hash<Loc>([_base.left(2)]));
    chains.push(new Hash<Loc>([_base.down(2)]));

    return chains;
  }
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
