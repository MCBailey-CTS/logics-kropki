import { Loc } from "../Loc";
import { IEdit } from "../interfaces/IEdit";
import { IKropkiPuzzle } from "../interfaces/IKropkiPuzzle";
import { BaseKropkiChain } from "../abstract/BaseKropkiChain";


export class ChainDBWW extends BaseKropkiChain {
  findChains(puzzle: IKropkiPuzzle): Loc[][] {
    const chains: Loc[][] = [];

    for (let r = 0; r < puzzle.length - 1; r++)
      for (let c = 0; c < puzzle.length - 1; c++) {
        const loc = new Loc(r * 2, c * 2);

        const temp = [loc, loc.right(2), loc.right(2).down(2), loc.down(2)];





      }

    // for (const loc0 of puzzle.sudokuCellLocs)
    //   for (const loc1 of puzzle.getSurroundingCellLocs(loc0))
    //     for (const loc2 of puzzle.getSurroundingCellLocs(loc1))
    //       for (const loc3 of puzzle.getSurroundingCellLocs(loc2)) {
    //         if (new LocSet([loc0, loc1, loc2, loc3]).size != 4) continue;
    //         chains.push([loc0, loc1, loc2, loc3]);
    //       }
    return chains;
  }

  solve(puzzle: IKropkiPuzzle, cellChainLocs: Loc[]): IEdit[] {
    const edits: IEdit[] = [];

    // if (cellChainLocs.length != 3) return edits;
    // if (puzzle.id != "002.kropki") return edits;
    console.log(cellChainLocs);

    return edits;
  }
}
