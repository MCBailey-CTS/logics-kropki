import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { IKropkiVectors } from "../interfaces/IKropkiVectors";
import { Loc } from "../Loc";

export abstract class _BaseKropkiVector implements IKropkiVectors {
  abstract get vector_chains(): Loc[][];

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

  abstract solve2(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[];

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of puzzle.sudokuCellLocs)
      for (const vectorChain of this.vector_chains) {
        const locs: Loc[] = [loc];

        let intersectionString = "";

        for (const vec of vectorChain) {
          const previous = locs[locs.length - 1];

          const next = previous.add_vector(vec.row, vec.col);

          if (!next.isValidKropkiLoc(puzzle.length)) break;

          // continue;
          const intersectionLoc = puzzle.getIntersection(previous, next);

          intersectionString += puzzle.getCellString(intersectionLoc);

          locs.push(next);
        }

        if (this.expected_kropki_string != intersectionString) continue;

        if (vectorChain.length + 1 != locs.length) continue;

        edits.push(...this.solve2(puzzle, locs));
      }

    return edits;
  }
}
