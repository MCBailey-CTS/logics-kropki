import { IHash } from "../../../IHash";
import { _BaseKropkiVectorString1 } from "./_BaseKropkiVectorString1";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { Loc } from "../../Loc";


export class Chain_e extends _BaseKropkiVectorString1 {
  get expected_kropki_string(): string {
    return ".";
  }

  solveChain(locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of this.puzzle.getCellList(locs._at(0))) {
      const kropkiCandidates = [
        ...this.puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = this.puzzle.getCellList(locs._at(1));

      for (const t of kropkiCandidates)
        otherHash.delete(t);

      if (otherHash._size > 0)
        continue;

      if (!this.puzzle.removeCandidate(locs._at(0), candidate))
        continue;

      edits.push(new Edit(this.puzzle, locs._at(0), candidate, this));
    }

    return edits;
  }
}
