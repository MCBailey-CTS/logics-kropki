import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiVectors } from "../interfaces/IKropkiVectors";
import { Loc } from "../Loc";

export abstract class _BaseKropkiVector implements IKropkiVectors {
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

  abstract get vector_chains(): IHash<Loc>[];

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

  abstract get expected_kropki_string(): string;

  abstract solveChain(locs: IHash<Loc>): IEdit[];

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
}
