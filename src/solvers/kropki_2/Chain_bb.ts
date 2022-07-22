import { IHash } from "../../../IHash";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString2 } from "./_BaseKropkiVectorString2";

export class Chain_bb extends _BaseKropkiVectorString2 {
  get expected_kropki_string(): string {
    return "bb";
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = puzzle.getCommonHouses(locs);

    if (commonHouses.length == 0) return edits;

    if (puzzle.length == 9) {
      // edge
      for (const candidate of [3, 5, 6, 7, 9])
        if (puzzle.removeCandidate(locs._at(0), candidate))
          edits.push(new Edit(puzzle, locs._at(0), candidate, this));

      // center
      for (const candidate of [1, 3, 5, 6, 7, 8, 9])
        if (puzzle.removeCandidate(locs._at(1), candidate))
          edits.push(new Edit(puzzle, locs._at(1), candidate, this));

      // outsiders
      for (const house of commonHouses) {
        for (const loc of house) {
          if (loc.equals(locs._at(0))) continue;
          if (loc.equals(locs._at(1))) continue;
          if (loc.equals(locs._at(2))) continue;

          if (puzzle.removeCandidate(loc, 2))
            edits.push(new Edit(puzzle, loc, 2, this));
          if (puzzle.removeCandidate(loc, 4))
            edits.push(new Edit(puzzle, loc, 4, this));
        }
      }
    } else {
      // edge
      for (const candidate of [2, 3, 5, 6, 7])
        if (puzzle.removeCandidate(locs._at(0), candidate))
          edits.push(new Edit(puzzle, locs._at(0), candidate, this));

      // center
      for (const candidate of [1, 3, 4, 5, 6, 7])
        if (puzzle.removeCandidate(locs._at(1), candidate))
          edits.push(new Edit(puzzle, locs._at(1), candidate, this));

      // outsiders
      for (const house of commonHouses) {
        // console.log(cellChainLocs);
        // console.log(house);
        for (const loc of house) {
          if (loc.equals(locs._at(0))) continue;
          if (loc.equals(locs._at(1))) continue;
          if (loc.equals(locs._at(2))) continue;
          if (puzzle.removeCandidate(loc, 2))
            edits.push(new Edit(puzzle, loc, 2, this));
        }
      }
    }
    return edits;
  }
}
