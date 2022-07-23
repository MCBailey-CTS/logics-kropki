import { IHash } from "../../../IHash";
import { _BaseKropkiVectorString1 } from "./_BaseKropkiVectorString1";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { Loc } from "../../Loc";
import { newMethod } from "./Chain_b";


export class Chain_w extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return "w";
  }

  isValidCandidate(candidate: number, other: IHash<number>): boolean {
    // return true;
    return other.has(candidate + 1) || other.has(candidate - 1);
  }

  solveChain(locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    // const loc = locs._at(0);
    // const other = locs._at(1);
    const commonHouses = this.puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0)
      return edits;

    const otherHash = this.puzzle.getCellList(locs._at(1));

    for (const candidate of this.puzzle.getCellList(locs._at(0))) {
      if (this.isValidCandidate(candidate, otherHash))
        continue;

      if (!this.puzzle.removeCandidate(locs._at(0), candidate))
        continue;

      edits.push(new Edit(this.puzzle, locs._at(0), candidate, this));
    }

    const hash = new Set<number>();

    for (const loc of locs)
      for (const candidate of this.puzzle.getCellList(loc))
        hash.add(candidate);

    if (hash.size != 3)
      return edits;

    const list = [...hash];

    list.sort((a, b) => {
      return a - b;
    });

    if (list[0] + 1 == list[1] && list[1] + 1 == list[2]) {
      // if (puzzle.id != "008.kropki") return edits;
      newMethod(commonHouses, locs, this.puzzle, list, edits, this);
    }

    return edits;
  }
}
