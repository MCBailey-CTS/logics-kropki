import { Loc } from "./Loc";
// import { BasePuzzleString } from "./BasePuzzleString";
import { IKropkiDiamond } from "./IKropkiDiamond";
import { KropkiString } from "./KropkiString";

export class KropkiDiamondWwwe implements IKropkiDiamond {
  // Check each candidate in the corners if +1 or -1 is not availabe in ether touching cell, then the candidate cannot be used there.
  solve(puzzle: KropkiString, diamondChain: Loc[]): boolean {
    // return false;

    let edited = false;

    let found = false;

    for (let i = 0; i < 4; i++) {
      if (
        puzzle.getCellString(diamondChain[0]) == "w" &&
        puzzle.getCellString(diamondChain[2]) == "w" &&
        puzzle.getCellString(diamondChain[4]) == "w" &&
        puzzle.getCellString(diamondChain[6]) == "."
      ) {
        found = true;

        break;
      }

      let element = diamondChain.shift();

      if (typeof element == "undefined")
        throw Error("undefined element in solveDiamondWWWE");

      diamondChain.push(element);

      element = diamondChain.shift();

      if (typeof element == "undefined")
        throw Error("undefined element in solveDiamondWWWE");

      diamondChain.push(element);
    }

    if (!found) throw Error(`could not find valid WWWE diamond chain`);

    const drCell = diamondChain[5];
    const dlCell = diamondChain[7];
    const trCell = diamondChain[3];
    const tlCell = diamondChain[1];

    // topLeft cell
    for (const candidate of puzzle.getCellCandidates(tlCell)) {
      const plus = candidate + 1;

      const minus = candidate - 1;

      if (
        (!puzzle.getCellSet(trCell).has(plus) &&
          !puzzle.getCellSet(dlCell).has(plus)) ||
        (!puzzle.getCellSet(trCell).has(minus) &&
          !puzzle.getCellSet(dlCell).has(minus))
      )
        edited = puzzle.removeCandidate(tlCell, candidate) || edited;
    }

    // topRightt cell
    for (const candidate of puzzle.getCellCandidates(trCell)) {
      const plus = candidate + 1;

      const minus = candidate - 1;

      if (
        (!puzzle.getCellSet(tlCell).has(plus) &&
          !puzzle.getCellSet(drCell).has(plus)) ||
        (!puzzle.getCellSet(tlCell).has(minus) &&
          !puzzle.getCellSet(drCell).has(minus))
      )
        edited = puzzle.removeCandidate(trCell, candidate) || edited;
    }

    return edited;
  }
}
