import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";
import { _BaseKropkiVector } from "./_BaseKropkiVector";

export abstract class _BaseKropkiVectorDiamond extends _BaseKropkiVector {
  get vector_chains(): IHash<Loc>[] {
    const chains: IHash<Loc>[] = [];
    const loc = new Loc(0, 0);

    chains.push(new Hash<Loc>([loc.right(2), loc.down(2), loc.left(2)]));
    chains.push(new Hash<Loc>([loc.right(2), loc.up(2), loc.left(2)]));
    chains.push(new Hash<Loc>([loc.left(2), loc.down(2), loc.right(2)]));
    chains.push(new Hash<Loc>([loc.left(2), loc.up(2), loc.right(2)]));

    chains.push(new Hash<Loc>([loc.up(2), loc.right(2), loc.down(2)]));
    chains.push(new Hash<Loc>([loc.up(2), loc.left(2), loc.down(2)]));

    chains.push(new Hash<Loc>([loc.down(2), loc.right(2), loc.up(2)]));
    chains.push(new Hash<Loc>([loc.down(2), loc.left(2), loc.up(2)]));

    return chains;
  }

  solvePuzzle(): IEdit[] {
    const edits: IEdit[] = [];

    for (const loc of this.puzzle.sudokuCellLocs) {
      for (const vectorChain of this.vector_chains) {
        const locs = new Hash<Loc>([loc]);

        for (const vector of vectorChain)
          locs.push(
            locs._at(locs._length - 1).add_vector(vector.row, vector.col)
          );

        if (
          ![...locs].every((loc1) => {
            return loc1.isValidKropkiLoc(this.puzzle.length);
          })
        )
          continue;

        let intersectionString = "";

        for (let i = 0; i < locs._length - 1; i++) {
          const intersectionLoc = this.puzzle.getIntersection(
            locs._at(i),
            locs._at(i + 1)
          );

          intersectionString += this.puzzle.getCellString(intersectionLoc);
        }

        const intersectionLoc1 = this.puzzle.getIntersection(
          locs._at(0),
          locs._at(locs._length - 1)
        );

        intersectionString += this.puzzle.getCellString(intersectionLoc1);

        if (this.expected_kropki_string != intersectionString) continue;

        edits.push(...this.solveChain(locs));
      }
    }

    return edits;
  }
}
