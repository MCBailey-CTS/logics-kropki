import { Loc } from "../Loc";
import { LocSet } from "../LocSet";
import { IEdit } from "./IEdit";
import { IKropkiPuzzle } from "./IKropkiPuzzle";

export interface IKropkiSolver {
  get id(): string;

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[];
}

export interface IKropkiVectors extends IKropkiSolver {
  get vector_chains(): Loc[][];

  get expected_kropki_string(): string;
}

export abstract class _BaseKropkiVector implements IKropkiVectors {
  abstract get vector_chains(): Loc[][];

  get id(): string {
    return this.constructor.name;
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

          // console.log(`Previous: ${previous}, ${vec}, Next: ${next}`);

          if (!next.isValidKropkiLoc(puzzle.length)) break;

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
