import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { _BaseDiamondChain } from "../abstract/_BaseDiamondChain";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
const BLACK_WHITE = [1, 5, 7, 9]; // -> [2, 3, 4, 6, 8];
const WHITE_EMPTY = [3, 5, 7, 9]; // -> [1, 2, 4, 6, 8];
const EMPTY_BLACK = [5, 7, 9]; // -> [1, 2, 3, 4, 6, 8];
const WHITE_WHITE = [1, 4, 6, 8, 9]; // -> [2, 3, 5, 7];

export class Chain_Debww extends _BaseKropkiVector {
  get vector_chains(): Loc[][] {
    const chains: Loc[][] = [];
    const loc = new Loc(0, 0);
    const temp = [loc.right(2), loc.down(2), loc.left(2)];

    chains.push(temp);
    // }

    return chains;
  }

  get expected_kropki_string(): string {
    return "ww.b";
  }

  solvePuzzle(puzzle: IKropkiPuzzle): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of puzzle.sudokuCellLocs) {
      const locs: Loc[] = [loc];

      for (const vectorChain of this.vector_chains) {
        // console.log(vectorChain);

        for (const vector of vectorChain)
          locs.push(locs[locs.length - 1].add_vector(vector.row, vector.col));

        locs.push(
          locs[locs.length - 1].add_vector(
            vectorChain[vectorChain.length - 1].row,
            vectorChain[vectorChain.length - 1].col
          )
        );

        // const locs: Loc[] = [
        //   loc.add_vector(vectorChain[0].row, vectorChain[0].col),
        //   loc
        //     .add_vector(vectorChain[0].row, vectorChain[0].col)
        //     .add_vector(vectorChain[1].row, vectorChain[1].col),

        //   loc
        //     .add_vector(vectorChain[0].row, vectorChain[0].col)
        //     .add_vector(vectorChain[1].row, vectorChain[1].col)
        //     .add_vector(vectorChain[2].row, vectorChain[2].col),

        //   loc
        //     .add_vector(vectorChain[0].row, vectorChain[0].col)
        //     .add_vector(vectorChain[1].row, vectorChain[1].col)
        //     .add_vector(vectorChain[2].row, vectorChain[2].col)
        //     .add_vector(vectorChain[3].row, vectorChain[3].col),
        // ];

        // console.log(locs);

        if (
          !locs.every((loc1) => {
            return loc1.isValidKropkiLoc(puzzle.length);
          })
        )
          continue;

        let intersectionString = "";

        for (let i = 0; i < locs.length - 2; i++) {
          const intersectionLoc = puzzle.getIntersection(locs[i], locs[i + 1]);

          intersectionString += puzzle.getCellString(intersectionLoc);
        }

        // const inLoc = puzzle.getIntersection(locs[0], locs[locs.length - 1]);

        // intersectionString += puzzle.getCellString(inLoc);

        if (this.expected_kropki_string != intersectionString) continue;

        console.log("/////");
        console.log(locs);
        console.log(intersectionString);

        // console.log(intersectionString);

        // edits.push(...this.solve2(puzzle, locs));
      }
    }

    return edits;
  }

  solve2(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    if (
      !locs.every((loc) => {
        return loc.isValidKropkiLoc(puzzle.length);
      })
    )
      return edits;

    // black -> white
    edits.push(...this.remove(puzzle, locs[0], ...BLACK_WHITE));

    // white -> white
    edits.push(...this.remove(puzzle, locs[1], ...WHITE_WHITE));

    // white -> empty
    edits.push(...this.remove(puzzle, locs[2], ...WHITE_EMPTY));

    // empty -> black
    edits.push(...this.remove(puzzle, locs[3], ...EMPTY_BLACK));

    return edits;
  }
}
