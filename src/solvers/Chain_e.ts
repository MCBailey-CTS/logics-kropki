import { Hash } from "../../Hash";
import { IHash } from "../../IHash";
import { _BaseKropkiVector } from "../abstract/_BaseKropkiVector";
import { _BaseKropkiVectorString1 } from "../abstract/_BaseKropkiVectorString1";
import { Edit } from "../Edit";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Loc } from "../Loc";

export class Chain_e extends _BaseKropkiVectorString1 {
  constructor() {
    super(".");
  }

  solveChain(puzzle: IKropkiPuzzle, locs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    for (const candidate of puzzle.getCellList(locs._at(0))) {
      const kropkiCandidates = [
        ...puzzle.getKropkiCandidates(candidate),
        candidate,
      ];

      const otherHash = puzzle.getCellList(locs._at(1));

      for (const t of kropkiCandidates) otherHash.delete(t);

      if (otherHash._size > 0) continue;

      if (!puzzle.removeCandidate(locs._at(0), candidate)) continue;

      edits.push(new Edit(puzzle, locs._at(0), candidate, this));
    }

    return edits;
  }
}
