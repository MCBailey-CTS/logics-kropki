import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiVectors } from "../interfaces/IKropkiVectors";
import { Loc } from "../Loc";

export abstract class _BaseKropkiVector implements IKropkiVectors {
  abstract get vector_chains(): IHash<Loc>[];

  get id(): string {
    return this.constructor.name;
  }

  remove(puzzle: IKropkiPuzzle, loc: Loc, ...candidates: number[]): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of candidates)
      if (puzzle.removeCandidate(loc, candidate))
        edits.push(new Edit(puzzle, loc, candidate, this));

    return edits;
  }

  abstract get expected_kropki_string(): string;

  abstract solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[];

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of puzzle.sudokuCellLocs)
      for (const vectorChain of this.vector_chains) {
        const locs: IHash<Loc> = new Hash<Loc>([loc]);

        let intersectionString = "";

        for (const vec of vectorChain) {
          const previous = locs._at(locs._length - 1);

          const next = previous.add_vector(vec.row, vec.col);

          if (!next.isValidKropkiLoc(puzzle.length)) break;

          // continue;
          const intersectionLoc = puzzle.getIntersection(previous, next);

          intersectionString += puzzle.getCellString(intersectionLoc);

          locs.push(next);
        }

        if (this.expected_kropki_string != intersectionString) continue;

        if (vectorChain._length + 1 != locs._length) continue;

        edits.push(...this.solveChain(puzzle, locs));
      }

    return edits;
  }
}

export abstract class _BaseKropkiVectorString1 extends _BaseKropkiVector {
  protected constructor(expectedKropkiString: string) {
    super();

    this.__expected = expectedKropkiString;
  }

  private readonly __expected:string;

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
    return this.__expected;
  }
}
