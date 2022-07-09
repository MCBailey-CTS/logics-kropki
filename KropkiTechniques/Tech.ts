import { BasePuzzleString } from "../BasePuzzleString";
import { KropkiString } from "../KropkiString";
import { Loc } from "../Loc";

export class Tech {
  static kropkiDiamondWwew6(
    puzzle: BasePuzzleString,
    rightValue: string,
    topValue: string,
    downValue: string,
    leftValue: string,
    downInt: Loc
  ): boolean {
    let edited = false;
    // if (
    //   rightValue == "w" &&
    //   topValue == "w" &&
    //   downValue == "." &&
    //   leftValue == "w"
    // ) {
    //   const bottomLeftLoc = downInt.left();
    //   const bottomRightLoc = downInt.right();

    //   const bottomLeftCandidates = puzzle.getCellCandidates(bottomLeftLoc);
    //   const bottomRightCandidates = puzzle.getCellCandidates(bottomRightLoc);

    //   if (KropkiString.isSubset([3, 4, 5], bottomRightCandidates))
    //     edited = puzzle.removeCandidate(bottomLeftLoc, 6) || edited;
    // }
    return edited;
  }

  static kropkiDiamondWwew0(
    puzzle: BasePuzzleString,
    rightValue: string,
    topValue: string,
    downValue: string,
    leftValue: string,
    downInt: Loc
  ): boolean {
    let edited = false;
    // if (
    //   rightValue == "w" &&
    //   topValue == "w" &&
    //   downValue == "." &&
    //   leftValue == "w"
    // ) {
    //   // 123456789 w 123456789    123456789 w 123456789
    //   //     w           w     ->     w           w
    //   // 123456789 . __3456___    123456789 . __3456___
    //   const bottomLeftLoc = downInt.left();
    //   const bottomRightLoc = downInt.right();

    //   const bottomLeftCandidates = puzzle.getCellCandidates(bottomLeftLoc);
    //   const bottomRightCandidates = puzzle.getCellCandidates(bottomRightLoc);

    //   if (KropkiString.isSubset([3, 4, 5, 6], bottomRightCandidates))
    //     edited = puzzle.removeCandidate(bottomLeftLoc, 5) || edited;

    //   if (KropkiString.isSubset([3, 4, 5, 6], bottomLeftCandidates))
    //     edited = puzzle.removeCandidate(bottomRightLoc, 5) || edited;
    // }
    return edited;
  }

  static kropkiDiamondWeww1(
    puzzle: BasePuzzleString,
    topValue: string,
    rightValue: string,
    downValue: string,
    leftValue: string,
    topInt: Loc,
    downInt: Loc
  ): boolean {
    let edited = false;
    // if (
    //   topValue == "w" &&
    //   rightValue == "." &&
    //   downValue == "w" &&
    //   leftValue == "w"
    // ) {
    //   // 123456789 w 123456789    123456789 w 12_456789
    //   //     w           .     ->     w           .
    //   // 123456789 w 123456___    123456789 w 123456___
    //   const topRightLoc = topInt.right();
    //   const bottomRightLoc = downInt.right();

    //   const topRightCandidates = puzzle.getCellCandidates(topRightLoc);
    //   const bottomRightCandidates = puzzle.getCellCandidates(bottomRightLoc);

    //   if (KropkiString.isSubset([1, 2, 3, 4, 5, 6], bottomRightCandidates))
    //     edited = puzzle.removeCandidate(topRightLoc, 3) || edited;

    //   if (KropkiString.isSubset([1, 2, 3, 4, 5, 6], topRightCandidates))
    //     edited = puzzle.removeCandidate(bottomRightLoc, 3) || edited;
    // }
    return edited;
  }

  static kropkiDiamondWeww0(
    puzzle: BasePuzzleString,
    topValue: string,
    rightValue: string,
    downValue: string,
    leftValue: string,
    topInt: Loc,
    downInt: Loc
  ): boolean {
    let edited = false;
    // if (
    //   topValue == "w" &&
    //   rightValue == "." &&
    //   downValue == "w" &&
    //   leftValue == "w"
    // ) {
    //   // 123456789 w 123456789    123456789 w 12_456789
    //   //     w           .     ->     w           .
    //   // 123456789 w 123456___    123456789 w 123456___
    //   const topRightLoc = topInt.right();
    //   const bottomRightLoc = downInt.right();

    //   const topRightCandidates = puzzle.getCellCandidates(topRightLoc);
    //   const bottomRightCandidates = puzzle.getCellCandidates(bottomRightLoc);

    //   if (KropkiString.isSubset([1, 2, 3, 4, 5, 6], bottomRightCandidates))
    //     edited = puzzle.removeCandidate(topRightLoc, 3) || edited;

    //   if (KropkiString.isSubset([1, 2, 3, 4, 5, 6], topRightCandidates))
    //     edited = puzzle.removeCandidate(bottomRightLoc, 3) || edited;
    // }
    return edited;
  }

  // static kropkiDiamondWwew(
  //   puzzle: BasePuzzleString,
  //   // rightValue: string,
  //   // topValue: string,
  //   // downValue: string,
  //   // leftValue: string,
  //   // downInt: Loc
  //   diamondChain: Loc[]
  // ): boolean {
  //   let edited = false;

  //   let found = false;

  //   for (let i = 0; i < 4; i++) {
  //     if (
  //       puzzle.getCellString(diamondChain[0]) == "w" &&
  //       puzzle.getCellString(diamondChain[2]) == "w" &&
  //       puzzle.getCellString(diamondChain[4]) == "w" &&
  //       puzzle.getCellString(diamondChain[6]) == "."
  //     ) {
  //       found = true;

  //       break;
  //     }

  //     let element = diamondChain.shift();

  //     if (typeof element == "undefined")
  //       throw Error("undefined element in solveDiamondWWWE");

  //     diamondChain.push(element);

  //     element = diamondChain.shift();

  //     if (typeof element == "undefined")
  //       throw Error("undefined element in solveDiamondWWWE");

  //     diamondChain.push(element);
  //   }

  //   if (!found) throw Error(`could not find valid WWWE diamond chain`);

  //   const drCell = diamondChain[5];
  //   const dlCell = diamondChain[7];
  //   const trCell = diamondChain[3];
  //   const tlCell = diamondChain[1];

  //   // if (
  //   //   rightValue == "w" &&
  //   //   topValue == "w" &&
  //   //   downValue == "." &&
  //   //   leftValue == "w"
  //   // ) {
  //   // 123456789 w 123456789    123456789 w 123456789
  //   //     w           w     ->     w           w
  //   // 123456789 . _23456___    12_456789 . _23456___
  //   // const bottomLeftLoc = downInt.left();
  //   // const bottomRightLoc = downInt.right();

  //   const bottomLeftCandidates = puzzle.getCellCandidates(dlCell);
  //   const bottomRightCandidates = puzzle.getCellCandidates(drCell);

  //   if (KropkiString.isSubset([2, 3, 4, 5, 6], bottomRightCandidates))
  //     edited = puzzle.removeCandidate(dlCell, 3) || edited;

  //   if (KropkiString.isSubset([2, 3, 4, 5, 6], bottomLeftCandidates))
  //     edited = puzzle.removeCandidate(drCell, 3) || edited;
  //   // }
  //   return edited;
  // }

  // const diamond = [
  //   topInt,
  //   topInt.right(),
  //   rightInt,
  //   rightInt.down(),
  //   downInt,
  //   downInt.left(),
  //   leftInt,
  //   leftInt.up(),
  // ];

  static kropkiDiamondWwew(
    puzzle: BasePuzzleString,
    // rightValue: string,
    // topValue: string,
    // downValue: string,
    // leftValue: string,
    leftCell: Loc,
    rightCell: Loc
  ): boolean {
    let edited = false;
    if (
      // rightValue == "w" &&
      // topValue == "w" &&
      // downValue == "." &&
      // leftValue == "w"
      true
    ) {
      // 123456789 w 123456789    123456789 w 123456789
      //     w           w     ->     w           w
      // 123456789 . _23456___    12_456789 . _23456___
      // const bottomLeftLoc = downInt.left();
      // const bottomRightLoc = downInt.right();

      const bottomLeftCandidates = puzzle.getCellCandidates(leftCell);
      const bottomRightCandidates = puzzle.getCellCandidates(rightCell);

      if (KropkiString.isSubset([2, 3, 4, 5, 6], bottomRightCandidates))
        edited = puzzle.removeCandidate(leftCell, 3) || edited;

      if (KropkiString.isSubset([2, 3, 4, 5, 6], bottomLeftCandidates))
        edited = puzzle.removeCandidate(rightCell, 3) || edited;
    }
    return edited;
  }
}
