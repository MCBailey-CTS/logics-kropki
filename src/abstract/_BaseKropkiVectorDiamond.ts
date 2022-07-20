import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { _BaseKropkiVector } from "./_BaseKropkiVector";



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

        if (!locs.every((loc1) => {
          return loc1.isValidKropkiLoc(puzzle.length);
        }))
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

        if (this.expected_kropki_string != intersectionString)
          continue;

        edits.push(...this.solveChain(puzzle, locs));
      }
    }

    return edits;
  }
}
