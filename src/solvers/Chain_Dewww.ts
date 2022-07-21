import { _BaseKropkiVectorDiamond } from "../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_Dewww extends _BaseKropkiVectorDiamond {
  get expected_kropki_string(): string {
    return "www.";
  }
  solveChain(puzzle: IKropkiPuzzle, chain: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain[0], 3));
    edits.push(...this.remove(puzzle, chain[1], 1, 9));
    edits.push(...this.remove(puzzle, chain[2], 1, 9));
    edits.push(...this.remove(puzzle, chain[3], 3));

    for (const candidate of puzzle.getCellList(chain[1])) {
      const beforeSet = puzzle.getCellList(chain[0]);

      const afterSet = puzzle.getCellList(chain[2]);

      const lowerC = candidate - 1;

      const upperC = candidate + 1;

      if (
        (!beforeSet.has(lowerC) && !afterSet.has(lowerC)) ||
        (!beforeSet.has(upperC) && !afterSet.has(upperC))
      )
        edits.push(...this.remove(puzzle, chain[1], candidate));
    }

    for (const candidate1 of puzzle.getCellList(chain[0])) {
      if (
        puzzle.getCellList(chain[1]).has(candidate1 + 1) &&
        !puzzle.getCellList(chain[1]).has(candidate1 - 1) &&
        !puzzle.getCellList(chain[2]).has(candidate1 + 2)
      )
        edits.push(...this.remove(puzzle, chain[0], candidate1));
    }

    return edits;
  }
}
