import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";
import { Edit } from "../Edit";

export class ChainDEWBB extends BaseDiamondChain {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const temp = [...cellChainLocs];

    let str = "";

    for (let i = 0; i < temp.length - 1; i++) {
      const loc0 = temp[i];
      const loc1 = temp[i + 1];

      str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
    }

    str += puzzle.getCellString(puzzle.getIntersection(temp[3], temp[0]));

    switch (str) {
      case "w.bb":
        const black_white = temp[0];
        const white_empty = temp[1];
        const empty_black = temp[2];

        if (puzzle.removeCandidate(black_white, 3))
          edits.push(new Edit(puzzle, black_white, 3, this));

        if (puzzle.removeCandidate(empty_black, 3))
          edits.push(new Edit(puzzle, empty_black, 3, this));
        break;
      case ".bbw":
      case "bbw.":

      // break;
      case "bw.b":
        // for (const loc of cellChainLocs) puzzle.removeCandidate(loc, 1);
        console.log(`unknown ${str}`);

        // console.log(str);

        break;
    }

    // if (str == "bbw.") {
    //   const newTemp = [...temp];

    //   newTemp.reverse();
    //   edits.push(...this.solveExplicit(puzzle, newTemp));
    //   break;
    // }

    // if (str == ".wbb") {
    //   edits.push(...this.solveExplicit(puzzle, temp));
    //   break;
    // }

    return edits;
  }

  // solveExplicit(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
  //   const edits: IEdit[] = [];

  //   const empty_white = locs[1];
  //   const white_black = locs[2];
  //   const black_black = locs[3];
  //   const black_empty = locs[0];

  //   // puzzle.removeCandidate(temp[0], 1);
  //   for (const candidate of [3, 6])
  //     for (const corner of [white_black, black_black, black_empty])
  //       if (puzzle.removeCandidate(corner, candidate))
  //         edits.push(new Edit(puzzle, corner, candidate, this));
  //   // puzzle.removeCandidate(white_black, 6);

  //   // puzzle.removeCandidate(black_black, 3);
  //   // puzzle.removeCandidate(black_black, 6);

  //   // puzzle.removeCandidate(black_empty, 3);
  //   // puzzle.removeCandidate(black_empty, 6);

  //   return edits;
  // }
}
