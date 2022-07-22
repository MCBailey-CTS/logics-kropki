import { Hash } from "../../../Hash";
import { IHash } from "../../../IHash";
import { _BaseKropkiVector } from "../../abstract/_BaseKropkiVector";
import { Edit } from "../../Edit";
import { IEdit } from "../../interfaces/IEdit";
import { IKropkiPuzzle } from "../../interfaces/IKropkiPuzzle";
import { Loc } from "../../Loc";
import { _BaseKropkiVectorString2 } from "./_BaseKropkiVectorString2";

export class Chain_bw extends _BaseKropkiVectorString2 {
  get expected_kropki_string(): string {
    return "bw";
  }

  solveChain(puzzle: IKropkiPuzzle, cellChainLocs: IHash<Loc>): IEdit[] {
    const edits: IEdit[] = [];

    const commonHouses = puzzle.getCommonHouses(cellChainLocs);

    if (commonHouses.length == 0) return edits;

    if (puzzle.removeCandidate(cellChainLocs._at(1), 1))
      edits.push(new Edit(puzzle, cellChainLocs._at(1), 1, this));

    return edits;
  }
}
