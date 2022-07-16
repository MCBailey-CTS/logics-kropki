import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";
import { Edit } from "../Edit";

export class ChainDEWWW extends BaseDiamondChain {
  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const temp = [...cellChainLocs];

    for (let k = 0; k < 4; k++) {
      let str = "";

      for (let i = 0; i < temp.length - 1; i++) {
        const loc0 = temp[i];
        const loc1 = temp[i + 1];

        str += puzzle.getCellString(puzzle.getIntersection(loc0, loc1));
      }

      str += puzzle.getCellString(puzzle.getIntersection(temp[3], temp[0]));

      if (str == ".www") {
        edits.push(...this.solveExplicit(puzzle, temp));
        break;
      }

      const item = temp.shift();

      if (typeof item == "undefined") throw Error();

      temp.push(item);
    }

    return edits;
  }

  solveExplicit(puzzle: IKropkiPuzzle, locs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    const white_empty = locs[0];
    const empty_white = locs[1];
    const white_white0 = locs[2];
    const white_white1 = locs[3];

    if (puzzle.removeCandidate(white_empty, 3))
      edits.push(new Edit(puzzle, white_empty, 3, this));

    if (puzzle.removeCandidate(empty_white, 3))
      edits.push(new Edit(puzzle, empty_white, 3, this));

    return edits;
  }
}
