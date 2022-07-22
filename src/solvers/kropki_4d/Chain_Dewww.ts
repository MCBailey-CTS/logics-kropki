import { IHash } from "../../../IHash";
import { _BaseKropkiVectorDiamond } from "../../abstract/_BaseKropkiVectorDiamond";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString4D } from "./_BaseKropkiVectorString4D";

export class Chain_Dewww extends _BaseKropkiVectorString4D {
  get expected_kropki_string(): string {
    return "www.";
  }
  solveChain(puzzle: IKropkiPuzzle, chain: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    edits.push(...this.remove(puzzle, chain._at(0), 3));
    edits.push(...this.remove(puzzle, chain._at(1), 1, 9));
    edits.push(...this.remove(puzzle, chain._at(2), 1, 9));
    edits.push(...this.remove(puzzle, chain._at(3), 3));

    for (const candidate of puzzle.getCellList(chain._at(1))) {
      const beforeSet = puzzle.getCellList(chain._at(0));

      const afterSet = puzzle.getCellList(chain._at(2));

      const lowerC = candidate - 1;

      const upperC = candidate + 1;

      if (
        (!beforeSet.has(lowerC) && !afterSet.has(lowerC)) ||
        (!beforeSet.has(upperC) && !afterSet.has(upperC))
      )
        edits.push(...this.remove(puzzle, chain._at(1), candidate));
    }

    for (const candidate1 of puzzle.getCellList(chain._at(0))) {
      if (
        puzzle.getCellList(chain._at(1)).has(candidate1 + 1) &&
        !puzzle.getCellList(chain._at(1)).has(candidate1 - 1) &&
        !puzzle.getCellList(chain._at(2)).has(candidate1 + 2)
      )
        edits.push(...this.remove(puzzle, chain._at(0), candidate1));
    }

    return edits;
  }
}