import { _BaseDiamondChain } from "../abstract/_BaseDiamondChain";
import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Dewbb extends _BaseKropkiVectorDiamond {
  get expected_kropki_string(): string {
    return "w.bb";
  }
  get expectedKropkiString(): string {
    return "w.bb";
  }
  solveChain(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];
    // [0]
    for (const candidate of [1, 3, 5, 6, 7, 9])
      if (puzzle.removeCandidate(chain[0], candidate))
        edits.push(new Edit(puzzle, chain[0], candidate, this));

    // [2]
    for (const candidate of [3, 5, 6, 7, 9])
      if (puzzle.removeCandidate(chain[2], candidate))
        edits.push(new Edit(puzzle, chain[2], candidate, this));

    // [3]
    for (const candidate of [1, 3, 5, 6, 7, 8, 9])
      if (puzzle.removeCandidate(chain[3], candidate))
        edits.push(new Edit(puzzle, chain[3], candidate, this));

    return edits;
  }
}
