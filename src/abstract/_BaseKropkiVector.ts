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

  abstract solveChain(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[];

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

        edits.push(...this.solveChain(puzzle, locs));
      }

    return edits;
  }
}


export abstract class _BaseKropkiVectorDiamond extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const chains: Loc[][] = [];
    const loc = new Loc(0, 0);

    chains.push([loc.right(2), loc.down(2), loc.left(2)]);
    chains.push([loc.right(2), loc.up(2), loc.left(2)]);
    chains.push([loc.left(2), loc.down(2), loc.right(2)]);
    chains.push([loc.left(2), loc.up(2), loc.right(2)]);

    chains.push([loc.up(2), loc.right(2), loc.down(2)]);
    chains.push([loc.up(2), loc.left(2), loc.down(2)]);

    chains.push([loc.down(2), loc.right(2), loc.up(2)]);
    chains.push([loc.down(2), loc.left(2), loc.up(2)]);

    return chains;
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of puzzle.sudokuCellLocs) {
      for (const vectorChain of this.vector_chains) {
        const locs: Loc[] = [loc];

        for (const vector of vectorChain)
          locs.push(locs[locs.length - 1].add_vector(vector.row, vector.col));

        if (
          !locs.every((loc1) => {
            return loc1.isValidKropkiLoc(puzzle.length);
          })
        )
          continue;

        let intersectionString = "";

        for (let i = 0; i < locs.length - 1; i++) {
          const intersectionLoc = puzzle.getIntersection(locs[i], locs[i + 1]);

          intersectionString += puzzle.getCellString(intersectionLoc);
        }

        const intersectionLoc1 = puzzle.getIntersection(
          locs[0],
          locs[locs.length - 1]
        );

        intersectionString += puzzle.getCellString(intersectionLoc1);

        if (this.expected_kropki_string != intersectionString) continue;

        edits.push(...this.solveChain(puzzle, locs));
      }
    }

    return edits;
  }
}

