import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { Edit } from "../Edit";
import { BaseDiamondChain } from "../abstract/BaseDiamondChain";

export class ChainDEBWB extends BaseDiamondChain {
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

      if (str == ".bwb") {
        const loc234_0 = temp[2];
        const loc234_1 = temp[3];

        const other0 = temp[0];
        const other1 = temp[1];

        const master = new Set<number>([2, 3, 4]);

        const set0 = puzzle.getCellSet(loc234_0);
        const set1 = puzzle.getCellSet(loc234_1);

        const allCandidates = new Set<number>([...set0, ...set1]);

        console.log(allCandidates);

        if (
          puzzle.getCellString(loc234_0) == "_234_____" &&
          puzzle.getCellString(loc234_1) == "_234_____"
        ) {
          // console.log(puzzle.getCellString(loc234_0));
          // console.log(puzzle.getCellString(loc234_1));
          // console.log(puzzle.getCellString(other0));
          // console.log(puzzle.getCellString(other1));

          for (const house of puzzle.getCommonHouses([other0, other1]))
            for (const loc of house) {
              if (loc.equals(other0)) continue;

              if (loc.equals(other1)) continue;

              if(puzzle.removeCandidate(loc,6))
                edits.push(new Edit(puzzle,loc,6,this));
            }
        }

        // console.log(set0);
        // console.log(set1);

        // if (
        //   [...set0, ...set1].every((canidate) => {
        //     return master.has(canidate);
        //   })
        // ) {
        //   // console.log(`${other0.toString()} ${other1.toString()}`);
        //   // if (puzzle.removeCandidate(temp[2], 3))
        //   //   edits.push(new Edit(puzzle, temp[2], 3, this));
        //   // if (puzzle.removeCandidate(temp[3], 1))
        //   //   edits.push(new Edit(puzzle, temp[3], 1, this));
        // }
        break;
      }
      // else if (str == "bwb.") {
      //   temp.reverse();

      //   if (puzzle.removeCandidate(temp[0], 1))
      //     edits.push(new Edit(puzzle, temp[0], 1, this));

      //   break;
      // }

      const item = temp.shift();

      if (typeof item == "undefined") throw Error();

      temp.push(item);
    }

    return edits;
  }
}


