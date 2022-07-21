import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Debwb extends _BaseKropkiVectorDiamond {
  get expected_kropki_string(): string {
    return "wb.b";
  }

  solveChain(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 1));
    edits.push(...this.remove(puzzle, chain[1], 1));

    const hash0 = puzzle.getCellSet(chain[0]);
    const hash1 = puzzle.getCellSet(chain[1]);

    let explicit = [2, 3, 4];

    if (!hash0.is_subset_of(explicit) || !hash1.is_subset_of(explicit))
      return edits;

    for (const house of puzzle.getCommonHouses([chain[2], chain[3]])) {
      for (const loc of house) {
        if (loc.equals(chain[2])) continue;
        if (loc.equals(chain[3])) continue;

        edits.push(...this.remove(puzzle, loc, 6));
      }
    }

    return edits;
  }
}
