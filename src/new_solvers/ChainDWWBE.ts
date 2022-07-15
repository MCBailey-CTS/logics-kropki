import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";
import { Edit } from "../Edit";

export class ChainDWWBE extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (let r = 0; r < puzzle.length - 1; r++)
      for (let c = 0; c < puzzle.length - 1; c++) {
        const loc = new Loc(r * 2, c * 2);

        const temp = [loc, loc.right(2), loc.right(2).down(2), loc.down(2)];

        chains.push(temp);
      }

    return chains;
  }

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

      if (str == "wwb.") {
        if (puzzle.removeCandidate(temp[2], 1))
          edits.push(new Edit(puzzle, temp[2], 1, this));

        break;
      }

      const item = temp.shift();

      if (typeof item == "undefined") throw Error();

      temp.push(item);
    }

    return edits;
  }
}
