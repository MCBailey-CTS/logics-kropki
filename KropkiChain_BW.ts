import { Loc } from "./Loc";
import { BasePuzzleString } from "./BasePuzzleString";
import { IKropkiChain } from "./IKropkiChain";


export class KropkiChain_BW implements IKropkiChain {
  solve(puzzle: BasePuzzleString, chainLocs: Loc[]): boolean {
    const tempLocs = [...chainLocs];

    let edited = false;

    edited = puzzle.removeCandidate(tempLocs[2], 1, 9) || edited;

    if (puzzle.getCellString(tempLocs[1]) == "w")
      tempLocs.reverse();

    return KropkiChain_BW.solveExplicit_BW(puzzle, tempLocs) || edited;
  }

  static solveExplicit_BW(puzzle: BasePuzzleString, chainLocs: Loc[]): boolean {
    let edited = puzzle.removeCandidate(chainLocs[2], 1, puzzle.length);

    return (
      (puzzle.getCellSet(chainLocs[0]).has(1) &&
        puzzle.getCellSet(chainLocs[2]).has(2) &&
        !puzzle.getCellSet(chainLocs[4]).has(3) &&
        puzzle.removeCandidate(chainLocs[0], 1)) ||
      edited
    );
  }
}
